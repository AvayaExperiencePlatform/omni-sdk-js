# Avaya Experience Platform™ Web Omni SDK

> **:warning: Disclaimer**
>
> Installing, downloading, copying or using this SDK is subject to terms and conditions available in the LICENSE file.

## Prerequisites

Before you start integrating your web application with the Avaya Experience Platform™ (AXP) Web Omni SDK, you need to make sure that you have the required information, like the `integrationId`, `appKey`, and `region`. The Avaya Experience Platform™ account administrator should be able to provide you with these details.

Your backend application server additionally needs changes to be able to acquire JWT tokens for your web application. Refer to [this guide](https://developers.avayacloud.com/avaya-experience-platform/docs/overview#provisioning-an-integration) for a detailed description about this.

## Getting Started

The Avaya Experience Platform™ Web Omni SDK consist of three modules:

- [AXP Core](./core.md)
- [AXP Messaging](./messaging.md)
- [AXP Messaging UI](./messaging-ui.md)
- [AXP WebRTC](./webrtc.md)

Start with the [AXP Core](./core.md) module to initialize the SDK and establish a session with AXP. The easiest and fastest way to enable your application with AXP Messaging capabilities is to use the built-in [AXP Messaging UI](./messaging-ui.md). In case your application needs to handle messaging events or you want to create your own Messaging UI, use the [AXP Messaging](./messaging.md) module. For WebRTC application, use the [AXP WebRTC](./webrtc.md).

## License

View [LICENSE](./LICENSE)

## Changelog

View [CHANGELOG.md](./CHANGELOG.md)
