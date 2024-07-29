# Change Log

## v1.0.0 (July 29, 2024)

- Bumped versions of all external dependencies or all modules to their latest versions.
- Multiple bug fixes.

### Breaking Changes

- Renamed all packages from `@avaya/axp-client-sdk-<name>` to `@avaya/axp-omni-sdk-<name>`.
- Renamed all the types, classes, interfaces, methods etc. that contain `ClientSdk` in their name with `OmniSdk`.
- Bump versions of all packages to `1.0.0`.

#### AXP Core

- Renamed export `AxpClientSdk` to `AxpOmniSdk`.
- Renamed export `AxpClientSdkInitParams` to `AxpOmniSdkInitParams`.
- Renamed export `SDKEvent` to `SdkEvent`.
- Renamed export `SDKShutdown` to `SdkShutdown`.
- Removed field `conversationId` from type `SdkEvent` and hence from types `SdkShutdown` and `IdleTimeout` that extend it.
- Removed type `LoggerFactory` from public API / types of AXP Core.

#### AXP Messaging

- Removed field `conversationId` from type `EventStreamFailed` as it extends `SdkEvent`.
- Removed field `messageIndex` from types `Message` and `MessageEvent`.

#### AXP Messaging UI

- Renamed `AxpOmniSdkMessagingUi.setJWT()` method to `setJwt()`.
- Renamed Messaging UI Web Component's name from `<axp-messaging-ui-sdk>` to `<axp-omni-sdk-messaging-ui>`.
- Renamed export `AxpMessagingUiSdk` to `AxpOmniSdkMessagingUi`.
- Renamed export `AxpMessagingUiTheme` to `AxpOmniSdkMessagingUiTheme`.
- Renamed export `AxpMessagingUiConfig` to `AxpOmniSdkMessagingUiConfig`.
- Renamed export `AxpMessagingUiInitParams` to `AxpOmniSdkMessagingUiInitParams`.
- Renamed Messaging UI global configuration variable's name from `window.axpMessagingUiConfig` to `window.axpOmniSdkMessagingUiConfig`.

## v0.2.0 (June 28, 2024)

- Bugfixes in AXP Core, AXP Messaging and AXP Calling modules.
- Auto resume of a messaging conversation initiated from another session of the same user.
- Changes in AXP Messaging UI -
  - `displayNames` in `displayStrings` now accepts a callback function.
  - Attachment messages can now be sent with text.
  - Background and hover background colors of action buttons, attachment menu items and participants list icon can now be customized.
  - Anonymous customer name can be overridden in `displayStrings`. Default is 'Guest'.
  - Coordinates are now numbers (LocationRequestHandler).
  - Enums are now exported as values.
  - AXP Messaging UI CSS is now scoped to the component and does not affect the rest of the page.

## v0.1.1 (June 21, 2024)

- Bugfixes in AXP Calling module
  - Add backwards compatibility for network events protocol
  - Enable continuous activity for WebRTC call, i.e. prevent call ending after 10 minutes due to inactivity timer

## v0.1.0 (May 22, 2024)

- Introduction of new AXP Omni SDK module: AXP Calling.
- Documentation improvements for modules: AXP Core, AXP Messaging and AXP Messaging UI.
- Accessibility improvements in AXP Messaging UI module.
- Bugfixes in AXP Core, AXP Messaging and AXP Messaging UI modules.
- Added the complete theme example in sample-app-messaging.

## v0.0.1 (April 04, 2024)

Introduction of AXP Omni SDK modules: AXP Core, AXP Messaging and AXP Messaging UI.
