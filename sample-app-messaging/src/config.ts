import themes from "./customization/themes";
import displayStrings from "./customization/display-strings";

export const tokenServerUrl = "https://127.0.0.1:3000/token";

window.axpOmniSdkMessagingUiConfig = {
	appKey: "<app-key>", // Application Key
	host: "<host-name>", // example: https://na.api.avayacloud.com
	integrationId: "<integration-id>", // The unique 36 character Integration ID available to your account administrator when the integration was created.

	themeCustomizations: themes,
	defaultTheme: "professional",
	displayStrings: displayStrings,
	idleTimeoutDuration: 300000, // duration in ms
	idleShutdownGraceTimeoutDuration: 30000, // duration in ms

	onIdleTimeOut: () => console.log("Idle timeout occurred"),
	onMessageBubbleClicked: () => console.log("Message bubble clicked"),
	onInit: (instance) => console.log("AXP Omni SDK Messaging UI has initialized", instance.initialized),
	onShutdown: (instance) => console.log("AXP Omni SDK Messaging UI has shut down", instance.initialized),
};
