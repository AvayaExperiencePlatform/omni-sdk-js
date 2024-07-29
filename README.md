# Avaya Experience Platform™ Web Omni SDK

> **:warning: Disclaimer**
>
> Installing, downloading, copying or using this SDK is subject to terms and conditions available in the LICENSE file.

## Prerequisites

Before you start integrating your web application with the Avaya Experience Platform™ (AXP) Web Omni SDK, you need to make sure that you have the required information, like the `integrationId`, `appKey`, and `region`. The Avaya Experience Platform™ account administrator should be able to provide you with these details.

Your backend application server additionally needs changes to be able to acquire JWT tokens for your web application. Refer to [this guide](https://developers.avayacloud.com/avaya-experience-platform/docs/overview#provisioning-an-integration) for a detailed description about this.

## Getting Started

The Avaya Experience Platform™ Web Omni SDK consist of four modules:

- [AXP Core](./modules/_avaya_axp_omni_sdk_core.html)
- [AXP Messaging](./modules/_avaya_axp_omni_sdk_messaging.html)
- [AXP Messaging UI](./modules/_avaya_axp_omni_sdk_messaging_ui.html)
- [AXP Calling](./modules/_avaya_axp_omni_sdk_calling.html)

Start with the [AXP Core](./modules/_avaya_axp_omni_sdk_core.html) module to initialize the SDK and establish a session with AXP. The easiest and fastest way to enable your application with AXP Messaging capabilities is to use the built-in [AXP Messaging UI](./modules/_avaya_axp_omni_sdk_messaging_ui.html). In case your application needs to handle messaging events or you want to create your own Messaging UI, use the [AXP Messaging](./modules/_avaya_axp_omni_sdk_messaging.html) module. For Calling application, use the [AXP Calling](./modules/_avaya_axp_omni_sdk_calling.html).

## License

View [LICENSE](https://support.avaya.com/css/public/documents/101038288)

## Changelog

View [CHANGELOG.md](https://github.com/AvayaExperiencePlatform/omni-sdk-js/blob/master/CHANGELOG.md)
