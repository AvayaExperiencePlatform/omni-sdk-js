# Avaya Experience Platform™ Web Omni SDK

## :warning: Disclaimer

> Installing, downloading, copying or using this SDK is subject to terms and conditions available in the LICENSE file

## Prerequisites

Before you can start integrating your web application with the Avaya Experience Platform™ (AXP) Web Omni SDK, you need to make sure that you have the information you need to start the integration like the `integrationId`, `appKey`, and `region`. Avaya Experience Platform™ account administrator should be able to provide you these details.

Your backend application server should also be enabled to fetch JWT token for your web application. Refer [this guide](https://developers.avayacloud.com/avaya-experience-platform/docs/overview#provisioning-an-integration) for detailed description about this.

## Getting Started

The Avaya Experience Platform™ Web Omni SDK consist of three modules:

- [AXP Core](./core.md)
- [AXP Messaging](./messaging.md)
- [AXP Messaging UI](./messaging-ui.md)

Start with the [AXP Core](./core.md) module to initialize the SDK and establish session with AXP. The easiest and fastest way to enable your application with AXP Messaging capabilities is to use the built-in [AXP Messaging UI](./messaging-ui.md). In case your application needs to handle messaging events or you want to create your own Messaging UI, use the [AXP Messaging](./messaging.md) module.

## License

View [LICENSE](./LICENSE)

## Changelog

View [CHANGELOG.md](./CHANGELOG.md)
