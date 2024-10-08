import { AxpOmniSdk, JwtProvider } from "@avaya/axp-omni-sdk-core";
import { tokenServerUrl } from "./config";

export class Authenticator implements JwtProvider {
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
		AxpOmniSdk.setJwt(token);
	}
}
