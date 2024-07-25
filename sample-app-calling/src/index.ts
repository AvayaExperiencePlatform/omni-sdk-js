import { AxpOmniSdk, JwtProvider, LogLevel } from "@avaya/axp-omni-sdk-core";
import {
	AxpCalling,
	AxpCall,
	AxpCallRequestBuilder,
	AxpDtmfTone,
	AxpMediaInterface,
	AxpCallingConversation,
	AxpCallingConversationTrait,
} from "@avaya/axp-omni-sdk-calling";

import { playDtmfTone } from "./DTMFTone";

const sampleTokenServerURL = "https://127.0.0.1:3000/token";

const config = {
	integrationId: "<integrationId>",
	appKey: "<appKey>",
	axpHostName: "<axpHostName>",
	callingRemoteAddress: "<phoneNumber>",
};

class JwtProviderImpl implements JwtProvider {
	userId = crypto.randomUUID();
	user = {
		userName: "Guest",
		userId: this.userId,
		verified: true,
		userIdentifiers: {
			emailAddresses: [this.userId + "@example.com"],
		},
	};

	public async fetchToken(): Promise<string> {
		const response = await fetch(sampleTokenServerURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.user),
		});
		const responseJson = await response.json();
		return responseJson.jwtToken;
	}

	onExpire() {
		console.log("JWT has expired");
	}

	onExpireWarning(remainingTime: number) {
		console.log("JWT will expire in " + remainingTime);
	}
}

function setupButton(name: string, onClick: () => void) {
	document.querySelector<HTMLButtonElement>(`button[name="${name}"]`)!.onclick = onClick;
}

setupButton("startCallBT", startCall);
setupButton("endCallBT", () => call?.end());

setupButton("muteAudio", () => call?.muteAudio().then(updateStatusFlags));
setupButton("unmuteAudio", () => call?.unmuteAudio().then(updateStatusFlags));
setupButton("muteSpeaker", () => call?.muteSpeaker().then(updateStatusFlags));
setupButton("unmuteSpeaker", () => call?.unmuteSpeaker().then(updateStatusFlags));
[...(document.getElementsByClassName("dtmf") as HTMLCollectionOf<HTMLButtonElement>)].forEach(
	(button) => (button.onclick = sendDtmf),
);

const jwtTokenProvider = new JwtProviderImpl();
let conversation: AxpCallingConversationTrait | undefined;
let call: AxpCall | undefined;

async function login() {
	const axpSession = await AxpOmniSdk.init(
		{
			displayName: "Guest",
			token: await jwtTokenProvider.fetchToken(),
			integrationId: config.integrationId,
			host: config.axpHostName!,
			appKey: config.appKey,
			logLevel: LogLevel.WARN,
			jwtProvider: jwtTokenProvider,
			idleTimeoutDuration: 360000,
		},
		AxpCallingConversation(),
	);

	conversation = axpSession.conversations[0];

	const mediaEngine = await AxpCalling.getMediaEngine();
	const audioIf = mediaEngine.getAudioInterface();

	const speakerListContainer = document.getElementById("speakerListContainer") as HTMLSelectElement;
	const microphoneListContainer = document.getElementById("microphoneListContainer") as HTMLSelectElement;

	monitorDevices(audioIf.getOutputInterface(), "Speaker", speakerListContainer);
	monitorDevices(audioIf.getInputInterface(), "Microphone", microphoneListContainer);

	// why is speaker not defined until device is connected/disconnected?
	// console.log(audioIf.getOutputInterface().getAvailableDevices().map(d => d.getLabel()));
	// console.log(audioIf.getOutputInterface().getSelectedDevice().getLabel());
}

async function startCall() {
	await login();

	// Better if all builder arguments take an argument without side effects
	// muteAudio() should be setAudioMuted(boolean), etc.
	//
	// const options = new AxpCallRequestBuilder()
	//   .setAudioMuted(muteAudioCB.checked)
	//   .setRemoteAddress(axpConfig.remoteAddress)
	//   .build();
	// const axpCalling = await endpoint.createCall(options);

	// Even better to use the Partial<T> type and allow TS typing enforce presence of values in a config object:
	//
	// const axpCalling = await endpoint.createCall({
	//   muteAudio: startWithAudioMuted,
	//   remoteAddress: axpConfig.remoteAddress,
	// });

	const muteAudio = document.querySelector<HTMLInputElement>('input[value="muteAudio"]')!.checked;

	const requestBuilder = new AxpCallRequestBuilder();
	if (muteAudio) {
		requestBuilder.muteAudio();
	}

	requestBuilder.setRemoteAddress(config.callingRemoteAddress);
	call = await conversation!.addCall(requestBuilder.build(), setupCallMonitoring);

	callStarting = true;
	updateStatusFlags();
}

function updateAvailableDevicesList(mediaInterface: AxpMediaInterface, deviceListContainer: HTMLSelectElement) {
	deviceListContainer.replaceChildren(
		...mediaInterface.getAvailableDevices().map((device) => {
			const option = document.createElement("option");
			option.value = device.getDeviceId();
			option.textContent = device.getLabel();
			return option;
		}),
	);

	deviceListContainer.onchange = () => {
		const device = mediaInterface
			.getAvailableDevices()
			.find((device) => device.getDeviceId() === deviceListContainer.value);
		if (device) {
			mediaInterface.setSelectedDevice(device);
		}
	};
}

function monitorDevices(mediaIf: AxpMediaInterface, deviceType: string, deviceListContainer: HTMLSelectElement) {
	updateAvailableDevicesList(mediaIf, deviceListContainer);

	mediaIf.addOnDevicesAddedCallback((mIf) => updateAvailableDevicesList(mIf, deviceListContainer));
	mediaIf.addOnDevicesRemovedCallback((mIf) => updateAvailableDevicesList(mIf, deviceListContainer));

	mediaIf.addOnSelectedDeviceChangedCallback((mIf, device) => {
		console.log("Selected " + deviceType + " updated: " + device.toString());
	});

	mediaIf.addOnSelectedDeviceRemovedCallback((mIf, device) => {
		console.log("Selected " + deviceType + " removed : " + device.toString());
	});

	mediaIf.addOnDevicesUnavailableCallback((mIf) => {
		console.log(deviceType + " unavailable");
	});
}

let callStarting = false;

function setupCallMonitoring(c: AxpCall) {
	call = c;
	updateStatusFlags();

	c.addOnCallEstablishedCallback((c) => {
		console.log("*** Call Established");
		callStarting = false;
		updateStatusFlags();
	});

	c.addOnCallFailedCallback((call, exception) => {
		callStarting = false;
		updateStatusFlags();
		console.log("*** Call Failed: " + exception.getError());
		call.end();
	});

	c.addOnCallEndedCallback((c, evt) => {
		console.log("*** Call Ended: " + evt.getReason() + ";" + evt.getReasonText());
		call = undefined;
		updateStatusFlags();
		void AxpOmniSdk.shutdown();
	});

	c.addOnMediaConnectedCallback((c) => {
		console.log("*** Media Connected");
		updateStatusFlags();
	});

	c.addOnMediaFailedCallback((call) => {
		console.log("*** Media Failed");
		call.end(); // not 100% sure this is needed
	});

	c.addOnMediaDisconnectedCallback((c) => {
		console.log("*** Media Disconnected");
		updateStatusFlags();
	});
}

let sdkReady = false;
AxpOmniSdk.addSdkInitializedListener(() => {
	sdkReady = true;
	updateStatusFlags();
});
AxpOmniSdk.addSdkShutdownListener(() => {
	sdkReady = false;
	updateStatusFlags();
});

function updateStatusFlags() {
	const statusNode = document.getElementById("status")!;

	const setAttr = (kind: string, ready?: boolean) => {
		if (ready) {
			statusNode.setAttribute(kind, "");
		} else {
			statusNode.removeAttribute(kind);
		}
	};

	setAttr("sdk-ready", sdkReady);

	setAttr("service-available", AxpCalling.isServiceAvailable());
	setAttr("call-exists", !!call);
	setAttr("media-connected", call?.isMediaConnected());

	setAttr("call-starting", callStarting);
	// setAttr('call-starting', call && !call.getEstablishedTime() && /* would also need && !call.isFailed() */);
	setAttr("call-established", !!call?.getEstablishedTime() /* && !call.isFinished() */);

	setAttr("mic-muted", call?.isAudioMuted());
	setAttr("speaker-muted", call?.isSpeakerMuted());
}
function sendDtmf(event: Event) {
	const target = event.target as HTMLButtonElement;
	// WARNING: In general, we should not log DTMF tones, since they are often used to transmit sensitive information.
	console.log("Sending DTMF tone: " + target.value);
	let tone = target.value as AxpDtmfTone;
	call?.sendDTMF(tone);
	playDtmfTone(tone, 100);
}
