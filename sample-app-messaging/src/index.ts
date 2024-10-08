// ./config must be imported first, before @avaya/axp-omni-sdk-messaging-ui,
// because window.axpOmniSdkMessagingUiConfig must be defined before the UI is loaded.
import "./config";
import "@avaya/axp-omni-sdk-messaging-ui";
import { Authenticator } from "./auth";
import { AxpOmniSdkMessagingUi, Coordinates } from "@avaya/axp-omni-sdk-messaging-ui";

async function initOnMessageBubbleClicked(instance: AxpOmniSdkMessagingUi) {
	console.log("Message bubble clicked", instance);
	try {
		if (!instance) throw new Error("Instance of axp-omni-sdk-messaging-ui doesn't exist");

		const authenticator = new Authenticator(instance);
		instance.init({
			jwtProvider: authenticator,
			jwt: await authenticator.fetchToken(),
			userName: authenticator.user.userName,
			contextParameters: { example: "contextParameter" }, // change to whatever parameters you would like to send
			sessionParameters: { example: "sessionParameter" },
		});
	} catch (e) {
		console.log("Error while initializing axp-omni-sdk-messaging-ui", e);
		throw e;
	}
}

//location handler with promise
const locationRequestHandle = () =>
	new Promise<{ coordinates: Coordinates }>((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				resolve({
					coordinates: {
						lat: position.coords.latitude,
						long: position.coords.longitude,
					},
				});
			}, reject);
		} else {
			reject(new Error("Geolocation is not supported by this browser."));
		}
	});

window.axpOmniSdkMessagingUiConfig!.onMessageBubbleClicked = initOnMessageBubbleClicked;
window.axpOmniSdkMessagingUiConfig!.onLocationRequest = locationRequestHandle;
