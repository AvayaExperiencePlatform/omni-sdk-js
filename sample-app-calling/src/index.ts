import { AxpOmniSdk, LogLevel } from "@avaya/axp-omni-sdk-core";
import {
	AxpCall,
	AxpCalling,
	AxpCallingConversation,
	AxpCallingConversationTrait,
	AxpCallRequestBuilder,
	AxpDtmfTone,
	AxpMediaInterface,
} from "@avaya/axp-omni-sdk-calling";
import config from "./config";
import { Authenticator } from "./auth";
import { playDtmfTone } from "./dtmf-tone";

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

const authenticator = new Authenticator();
let conversation: AxpCallingConversationTrait | undefined;
let call: AxpCall | undefined;

async function login() {
	const axpSession = await AxpOmniSdk.init(
		{
			displayName: "Guest",
			token: await authenticator.fetchToken(),
			integrationId: config.integrationId,
			host: config.host,
			appKey: config.appKey,
			logLevel: LogLevel.WARN,
			jwtProvider: authenticator,
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
}

async function startCall() {
	await login();

	callStarting = true;
	updateStatusFlags();

	const muteAudio = document.querySelector<HTMLInputElement>('input[value="muteAudio"]')!.checked;

	const requestBuilder = new AxpCallRequestBuilder();
	if (muteAudio) {
		requestBuilder.muteAudio();
	}

	requestBuilder.setRemoteAddress(config.remoteAddress);
	void conversation!.addCall(requestBuilder.build(), setupCallMonitoring);
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
