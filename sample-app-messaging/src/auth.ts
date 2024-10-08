import { AxpOmniSdkMessagingUi, JwtProvider } from "@avaya/axp-omni-sdk-messaging-ui";
import { v4 as uuidV4 } from "uuid";
import { tokenServerUrl } from "./config";

export class Authenticator implements JwtProvider {
	private userId = uuidV4();
	user = {
		userName: "Guest",
		userId: this.userId,
		verified: true,
		userIdentifiers: {
			emailAddresses: [this.userId + "@example.com"],
		},
	};

	constructor(private readonly instance: AxpOmniSdkMessagingUi) {}

	async fetchToken() {
		const response = await fetch(tokenServerUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(this.user),
		});

		if (!response.ok) throw new Error(await response.text());

		const { jwtToken } = await response.json();
		return jwtToken;
	}

	onExpire() {
		console.log("JWT has expired");
	}

	async onExpireWarning(remainingTime: number) {
		console.log("JWT will expire in " + remainingTime);
		const token = await this.fetchToken();
		this.instance.setJwt(token);
	}
}
