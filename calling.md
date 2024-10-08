# AXP Calling

The AXP Calling SDK module provides browser based WebRTC communication. The AXP Calling module extends base Conversation with Calling capabilities.

The AXP Calling module depends on the AXP Core module. Please refer to the [AXP Core documentation](./core.md) before using the Calling module.

## Installation

AXP Calling module requires the AXP Core module.

To install the AXP Calling module, run the following command:

```bash
npm install --save @avaya/axp-omni-sdk-calling
```

This will install both AXP Core and AXP Calling.

## Usage

The AXP Calling module provides the `AxpCallingConversation` [mixin](https://www.typescriptlang.org/docs/handbook/mixins.html) that extends the Base Conversation of the AXP Core module. To use the Calling module, you need to import the `AxpCallingConversation` mixin function and apply it. Check out more details about additional functionalities in the `Using additional functionality` section of The [AXP Core's documentation](./core.md).

Example of how to use AXP Calling module:

```ts
import { AxpOmniSdk, JwtProvider } from "@avaya/axp-omni-sdk-core";
import { AxpCallingConversation, AxpCallingConversationTrait } from "@avaya/axp-omni-sdk-calling";

// Initiates a Calling conversation
const axpSession = await AxpOmniSdk.init(
	{
		displayName: "<USER_NAME>",
		token: await jwtTokenProvider.fetchToken(),
		integrationId: config.integrationId,
		host: config.axpHostName,
		appKey: config.appKey,
		logLevel: config.loglevel,
		jwtProvider: jwtTokenProvider,
	},
	AxpCallingConversation(),
);
const conversation: AxpCallingConversationTrait = axpSession.conversations[0];

// Creates and starts a WebRTC call with optional audio muted initially
const requestBuilder = new AxpCallRequestBuilder();
if (muteAudio) {
	requestBuilder.muteAudio();
}
requestBuilder.setRemoteAddress(config.callingRemoteAddress);
const axpCall = await conversation.addCall(requestBuilder.build());

// Creates and starts a WebRTC call with optional audio muted initially with optional
// setupCallbacks: (call: AxpCall) => void to register for optional call related callbacks
// const axpCall = await conversation.addCall(requestBuilder.build(), setupCallbacks);

// Call established

// Ends call
axpCall.end();

// Terminates session
AxpOmniSdk.shutdown();
```
