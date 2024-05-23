# AXP Calling

The AXP Calling SDK module provides browser based WebRTC communication. The AXP Calling module extends base Conversation with Calling capabilities.

The AXP Calling module depends on the AXP Core module. Please refer to the [AXP Core documentation](/modules/_avaya_axp_client_sdk_core) before using the Calling module.

## Installation

AXP Calling module requires the AXP Core module.

To install the AXP Calling module, download the [avaya-axp-client-sdk-core-0.1.0.tgz](./omni-sdk/avaya-axp-client-sdk-core-0.1.0.tgz) and [avaya-axp-client-sdk-calling-0.1.0.tgz](./omni-sdk/avaya-axp-client-sdk-calling-0.1.0.tgz) in your project and run the following command:

```bash
npm install ./avaya-axp-client-sdk-core-0.1.0.tgz ./avaya-axp-client-sdk-calling-0.1.0.tgz
```

This will install both AXP Core and AXP Calling.

## Usage

The AXP Calling module provides the `AxpCallingConversation` [mixin](https://www.typescriptlang.org/docs/handbook/mixins.html) that extends the Base Conversation of the AXP Core module. To use the Calling module, you need to import the `AxpCallingConversation` mixin function and apply it. Check out more details about additional functionalities in the [Using additional functionality](./core.md#using-additional-functionalities) section of The AXP Core's documentation.

Example of how to use AXP Calling module:

```ts
import { AxpClientSdk, JwtProvider } from '@avaya/axp-client-sdk-core';
import { AxpCallingConversation, AxpCallingConversationTrait } from '@avaya/axp-client-sdk-calling';

const axpConfig = {
    integrationId: "<INTEGRATION_ID>",
    appKey: "<APP_KEY>",
    axpHostName: "https://<Axp_HOST>",
    logLevel: LogLevel.DEBUG
};

AxpClientSDK.configure(axpConfig, jwtProvider);

// Initiates a Calling conversation
const axpSession = await AxpClientSDK.init({
    displayName: "<USER_NAME>",
    token: await jwtTokenProvider.fetchToken(),
    ...
}, AxpCallingConversation());
const conversation: AxpCallingConversationTrait = axpSession.conversations[0];

// Creates and starts a WebRTC call with optional audio muted initially 
const axpCall = await conversation.addCall(new AxpCallRequestBuilder().muteAudio().build());

// Creates and starts a WebRTC call with optional audio muted initially with optional
// setupCallbacks: (call: AxpCall) => void to register for optional call related callbacks
// const axpCall = await conversation.addCall(new AxpCallRequestBuilder().muteAudio().build(), setupCallbacks);

// Call established

// Ends call
axpCall.end();

// Terminates session
AxpClientSDK.shutdown();
```
