import "@avaya/axp-messaging-ui-sdk";
import { v4 as uuidv4 } from "uuid";

var user = {
	userName: "Guest",
	userId: uuidv4(),
	verified: true,
	userIdentifiers: {
		emailAddresses: [uuidv4() + "@example.com"],
	},
};

// console.log("Loading AXP UI SDK...")
const fetchToken = async () => {
	try {
		const response = await fetch(jwtUrl.trim(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		if (!response.ok) throw new Error("Failed to fetch token");

		const { jwtToken } = await response.json();

		return jwtToken;
	} catch (e) {
		console.log("Error while fetching jwt token", e);
		throw e;
	}
};

const jwtProviderHandler = {
	onExpire() {
		console.log("JWT has expired");
	},

	async onExpireWarning(remainingTime) {
		console.log("JWT will expire in " + remainingTime);
		const token = await fetchToken();
		instanceaxp.setJWT(token);
	},
};

//declared to use later
var instanceaxp;

async function initOnMessageBubbleClicked(instance) {
	console.log("Message bubble clicked", instance);
	try {
		if (!instance) throw new Error("Instance of axp-messaging-ui-sdk doesn't exist");
		instanceaxp = instance;

		const jwtToken = await fetchToken();
		var axpUiInitParams = {
			jwtProvider: jwtProviderHandler,
			jwt: jwtToken,
			userName: user.userName,
			contextParameters: contextParam,
			sessionParameters: {},
		};
		instance.init(axpUiInitParams);
	} catch (e) {
		console.log("Error while initializing axp-messaging-ui-sdk", e);
		throw e;
	}
}

//location handler with promise
const locationRequestHandle = () => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const coordinates = {
					lat: position.coords.latitude.toString(),
					long: position.coords.longitude.toString(),
				};
				resolve({ coordinates });
			}, reject);
		} else {
			reject(new Error("Geolocation is not supported by this browser."));
		}
	});
};

var config = {
	...axpMessagingUiConfig,
	onMessageBubbleClicked: initOnMessageBubbleClicked,
	onLocationRequest: locationRequestHandle,
};
window.axpMessagingUiConfig = config;
