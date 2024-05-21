# AXP WebRTC

The AXP WebRTC SDK module provides browser based WebRTC communication. The AXP WebRTC module extends base Conversation with webRTC audio capabilities.

The AXP WebRTC module depends on the AXP Core module. Please refer to the [AXP Core documentation](/modules/_avaya_axp_client_sdk_core) before using the WebRTC module.

## Installation

AXP WebRTC module requires the AXP Core module.

To install the AXP WebRTC module, download the [avaya-axp-client-sdk-core-0.1.0.tgz](./omni-sdk/avaya-axp-client-sdk-core-0.1.0.tgz) and [avaya-axp-client-sdk-webrtc-0.1.0.tgz](./omni-sdk/avaya-axp-client-sdk-webrtc-0.1.0.tgz) in your project and run the following command:

```bash
npm install ./avaya-axp-client-sdk-core-0.1.0.tgz ./avaya-axp-client-sdk-webrtc-0.1.0.tgz
```

This will install both AXP Core and AXP WebRTC.

## Usage

The AXP WebRTC module provides the `AxpWebRtcConversation` [mixin](https://www.typescriptlang.org/docs/handbook/mixins.html) that extends the Base Conversation of the AXP Core module. To use the WebRTC module, you need to import the `AxpWebRtcConversation` mixin function and apply it. Check out more details about additional functionalities in the [Using additional functionality](./core.md#using-additional-functionalities) section of The AXP Core's documentation.

Example of how to use AXP WebRTC module:

```ts
import { AxpClientSdk, JwtProvider } from '@avaya/axp-client-sdk-core';
import { AxpWebRtcConversation, AxpConversationWebRtcTrait } from '@avaya/axp-client-sdk-webrtc';

const axpConfig = {
    integrationId: "<INTEGRATION_ID>",
    appKey: "<APP_KEY>",
    axpHostName: "https://<Axp_HOST>",
    logLevel: LogLevel.DEBUG
};

AxpClientSDK.configure(axpConfig, jwtProvider);

// Initiates a WebRTC conversation
const axpSession = await AxpClientSDK.init({
    displayName: "<USER_NAME>",
    token: await jwtTokenProvider.fetchToken(),
    ...
}, AxpWebRtcConversation());
const axpWebrtcSDK: AxpConversationWebRtcTrait = axpSession.conversations[0];

// Registers a WebRTC endpoint 
// The WebRTCConfig is optional.
const axpWebrtcEndpoint = await axpWebrtcSDK.createEndpoint(new AxpWebRtcConfigBuilder().build());

// Creates and starts a WebRTC call with optional audio muted initially 
const axpCall = await axpWebrtcEndpoint.addCall(new AxpCallRequestBuilder().muteAudio().build());

// Creates and starts a WebRTC call with optional audio muted initially with optional
// setupCallbacks: (call: AxpCall) => void to register for optional call related callbacks
// const axpCall = await axpWebrtcEndpoint.addCall(new AxpCallRequestBuilder().muteAudio().build(), setupCallbacks);

// Call established

// Ends call
axpCall.end();

// Terminates session
AxpClientSDK.shutdown();
```
