# AXP Messaging UI

AXP Omni SDK Messaging UI provides a highly customizable user interface as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for messaging that can be easily integrated into the Client website to enable messaging capabilities. It empowers developers to finely tailor the messaging interface, allowing customization of colors, strings, icons, typography, etc., to meet the specific visual requirements of your application.

The AXP Messaging UI is build on top of [AXP Core](/modules/_avaya_axp_omni_sdk_core) and [AXP Messaging](/modules/_avaya_axp_omni_sdk_messaging) SDKs. Before using the AXP Omni SDK Messaging UI, please refer to [this page](https://developers.avayacloud.com/avaya-experience-platform/docs/introduction#next-steps) for a list of prerequisites.

## Features

- **Show messages with status:** Shows the messages from various sources such as agents, supervisors, and bots with time and status indicators, including real-time updates for messages being sent, successfully delivered to AXP, or requiring a retry due to failure.
- **Message Organization:** Organizes messages based on the date, providing users with a structured and easily navigable conversation timeline for a seamless and enjoyable messaging experience.
- **Show participants:** Shows a list of all active participants involved in a conversation along with the name of the sender in every message. This is particularly useful for non-customers, as it makes it easy for users to identify and follow the discussion flow.
- **Message History:** Retrieve and display historical messages in a conversation, enabling users to reference messages from previous interactions for context and continuity.
- **Infinite Scrolling:** Improve user experience by automatically fetching older messages as users scroll to the top, ensuring a seamless and uninterrupted conversation exploration.
- **Message Retry:** Facilitate communication resilience by allowing users to retry sending messages that may have failed in previous attempts.
- **Attachments:** Enhances communication capabilities by enabling users to send attachments, either independently or with accompanying text messages, fostering a richer and more interactive messaging experience.
- **Location Sharing:** Empower users to share location information seamlessly when requested by an agent, enhancing the contextual richness of conversations.
- **Rich Media:** Supports rich media messages like links, post backs, replies, and carousels, allowing for dynamic and engaging content within the messaging interface.
- **Customizability**: Provides fine grained customizations options for developers to tweak the messaging interface to meet the specific visual requirements of their brand.

## Installation

To install the AXP Omni SDK Messaging UI, run the following command:

```bash
npm install --save @avaya/axp-omni-sdk-messaging-ui
```

The AXP Omni SDK Messaging UI depends on the AXP Core SDK and AXP Messaging SDK, which would be installed alongside the AXP Omni SDK Messaging UI.

## Usage

The AXP Omni SDK Messaging UI exports a Web Component `<axp-omni-sdk-messaging-ui>` that can be used in your HTML code. Once the browser encounters the web component `<axp-omni-sdk-messaging-ui>` in the HTML document, it will instantiate it and the component will be rendered onto the screen. **Hence, it is important to note that all the configurations must be done before the component can be render. This is to make sure it picks up the correct configuration values while rendering. These configurations include the required AXP related configurations, callbacks and optional customizations.**

### Configuration

As stated above the AXP Omni SDK Messaging UI requires some configurations to be set before it can be rendered. This should be done by setting an config object by name `AxpOmniSdkMessagingUiConfig` on the `window` object before loading your website's script that uses (imports) the AXP Omni SDK Messaging UI.

**Example:**

Configuration script: `axp-messaging-ui-config.js`

```js
// Configuration script - axp-messaging-ui-config.js
window.AxpOmniSdkMessagingUiConfig = {
	// Required AXP configurations
	// Full list of AXP configurations are ignored here for brevity. Please refer to the Configuration options section below to know more.
};
```

```js
// Alternatively, you can declare the config object using the `var` keyword.
var AxpOmniSdkMessagingUiConfig = {
	// ...
};
```

Your website's script that uses the AXP Omni SDK Messaging UI: `your-website-script.js`

```js
import { AxpOmniSdkMessagingUi } '@avaya/axp-omni-sdk-messaging-ui';

// Your code ...
```

Your website's main HTML file: `index.html`

```html
<!-- Your index.html -->
<!doctype html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Messaging-App-UI</title>
		<script src="/path/to/axp-messaging-ui-config.js"></script>
		<script src="/path/to/your-website-script.js" type="module"></script>
	</head>
	<body>
		<axp-omni-sdk-messaging-ui></axp-omni-sdk-messaging-ui>
	</body>
</html>
```

#### Configuration options

The AXP Omni SDK Messaging UI supports following configuration options:

| Option                             | Type                                         | Required/Optional | Description                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | -------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`                             | `string`                                     | Required          | Hostname of the AXP API endpoint to connect to or an AXP region code. If a region code is provided (e.g., "na" for North America), it will be converted to the corresponding hostname (e.g., "na.api.avayacloud.com"). If a full hostname is provided (e.g., "na.api.avayacloud.com"), it will be used as is. |
| `integrationId`                    | `string`                                     | Required          | The unique 36 character Integration ID available to your account administrator when the integration was created.                                                                                                                                                                                              |
| `appKey`                           | `string`                                     | Required          | The unique key associate with tenant in case of APIXH integration.                                                                                                                                                                                                                                            |
| `sessionParameters`                | `object`                                     | Optional          | The session parameters to be passed to the AXP server.                                                                                                                                                                                                                                                        |
| `logLevel`                         | `LogLevel`                                   | Optional          | The log level for the AXP Omni SDK Messaging UI. Default is `WARN`.                                                                                                                                                                                                                                           |
| `idleTimeoutDuration`              | `number`                                     | Optional          | The duration in milliseconds after which the user is considered idle.                                                                                                                                                                                                                                         |
| `idleShutdownGraceTimeoutDuration` | `number`                                     | Optional          | The duration in milliseconds after idle timeout after which and the session is closed automatically due to user inactivity.                                                                                                                                                                                   |
| `locale`                           | `string`                                     | Optional          | The locale to be used for the AXP Omni SDK Messaging UI. Default is `en-US`.                                                                                                                                                                                                                                  |
| `onMessageBubbleClicked`           | `function`                                   | Optional          | The callback function to be called when the message bubble is clicked.                                                                                                                                                                                                                                        |
| `onInit`                           | `function`                                   | Optional          | The callback function to be called when the AXP Omni SDK Messaging UI is initialized for the current User (identified by the JWT).                                                                                                                                                                            |
| `onShutdown`                       | `function`                                   | Optional          | The callback function to be called when the current session for the current User is closed.                                                                                                                                                                                                                   |
| `onIdleTimeout`                    | `function`                                   | Optional          | The callback function to be called when the current User is considered idle.                                                                                                                                                                                                                                  |
| `onLocationRequest`                | `function`                                   | Optional          | The callback function to be called when the User is requested to share their location.                                                                                                                                                                                                                        |
| `beforeMessageSend`                | `function`                                   | Optional          | The callback function to be called before a message is sent.                                                                                                                                                                                                                                                  |
| `beforeMessageRender`              | `function`                                   | Optional          | The callback function to be called before a message is rendered on the screen.                                                                                                                                                                                                                                |
| `displayStrings`                   | `DisplayStrings`                             | Optional          | An object containing the display strings and their translations to be used in the AXP Omni SDK Messaging UI. See [custom display strings and translations](#custom-display-strings-and-translations) section.                                                                                                 |
| `emojiMartTranslations`            | `Record<Locale,EmojiMartTranslation>`        | Optional          | AXP Omni SDK Messaging UI uses [Emoji Mart](https://github.com/missive/emoji-mart) Component as emoji picker. This configuration expects an object containing the display strings and their translations to be used for the emoji mart component.                                                             |
| `themeCustomizations`              | `Record<string, AxpOmniSdkMessagingUiTheme>` | Optional          | An object containing the theme customizations for the AXP Omni SDK Messaging UI. Each key is a theme name and the value is the customizations for that theme. See [theme customization](#theme-customization) section.                                                                                        |
| `defaultTheme`                     | `string`                                     | Optional          | Name of the default theme out of the themes provided via the `themeCustomizations` configuration to be used for the AXP Omni SDK Messaging UI.                                                                                                                                                                |

### Authentication

The AXP Omni SDK Messaging UI doesn't authenticate the User. It expects the User to be authenticated by your website and its backend web application. The AXP Omni SDK Messaging UI uses JSON Web Tokens (JWT) and requires a valid JWT to function. The JWT is obtained from your own backend web application that communicates with AXP's authentication API.

The AXP Omni SDK Messaging UI expects an implementation of the `JwtProvider` interface to be provided during [initialization](#initialization). The `JwtProvider` implementation must have two methods:

1. `onExpiryWarning`: This method is called when the JWT is about to expire. In the argument of this method, the remaining time in milliseconds before the JWT expires is provided.
2. `onExpiry`: This method is called when the JWT has expired.

**The consumers of SDK should call the `AxpOmniSdkMessagingUi.setJWT()` to provide a new JWT to the SDK.**

JWT Provider example (in TypeScript):

```typescript
import { JwtProvider } from "@avaya/axp-omni-sdk-messaging-ui";

class MyJwtProvider implements JwtProvider {
	onExpiryWarning(timeToExpiry: number): void {
		// ...
	}

	onExpiry(): void {
		// ...
	}
}
```

JWT Provider example (in JavaScript):

```js
class MyJwtProviderJS {
  onExpiryWarning(timeToExpiry) {
    // ...
  }

  onExpiry(): void {
      // ...
  }
}
```

### Initialization

Before the User can start sending messages, the AXP Omni SDK Messaging UI must be initialized. The initialization process creates a new session for the current user (identified by the JWT) post which the user can start sending messages. The initialization can be done by calling the `init` method on the instance of the `<axp-omni-sdk-messaging-ui>` Web Component. The AXP Omni SDK Messaging UI exports the class responsible for the Web Component as `AxpOmniSdkMessagingUi`.

It can be imported as follows:

```ts
import { AxpOmniSdkMessagingUi } from "@avaya/axp-omni-sdk-messaging-ui";
```

Once imported, the instance can be procured by using the static method `getInstance()` on the class `AxpOmniSdkMessagingUi`. The `init` method can then be called on the returned instance object to initialize the AXP Omni SDK Messaging UI.

**⚠️ Important Note: Currently AXP Omni SDK Messaging UI supports a single instance, using multiple instances of the `<axp-omni-sdk-messaging-ui>` can lead to unpredictable behavior.**

**Example:**

```js
const axpOmniSdkMessagingUi = AxpOmniSdkMessagingUi.getInstance();

// Arguments excluded in this example for brevity.
axpOmniSdkMessagingUi.init(...);
```

The `init()` method takes an object of type `AxpOmniSdkMessagingUiInitParams` containing the following properties:

- `jwtProvider`: An implementation of the `JwtProvider` interface. See [Authentication](#authentication) section.
- `userName` (optional): The name of the current User to be displayed in the AXP Omni SDK Messaging UI.
- `jwt`: The JWT for the current User.
- `contextParameters` (optional): The context parameters to be passed to the AXP server for routing.
- `sessionParameters` (optional): The session parameters to be passed to the AXP server.

The `init()` method returns a `Promise` which resolves when the AXP Omni SDK Messaging UI is initialized successfully.

Full example:

```ts
import { AxpOmniSdkMessagingUi } from '@avaya/axp-omni-sdk-messaging-ui';

const axpOmniSdkMessagingUi = AxpOmniSdkMessagingUi.getInstance();

const axpOmniSdkMessagingUiInitParameters = {
  jwtProvider: new MyJwtProvider();
  jwt: '<User JWT>',
  displayName: 'John Doe',
  contextParameters: {
    'key1': 'value1',
    'key2': 'value2',
    // ...
  }
}

// Arguments excluded in this example for brevity.
await axpOmniSdkMessagingUi.init(axpOmniSdkMessagingUiInitParameters);
```

#### Waiting for initialization

As shown in above example the `init()` method returns a `Promise` which resolves when the AXP Omni SDK Messaging UI is initialized successfully, developers can `await` on this promise.

Alternatively, developers can also listen to the `onInit` callback provided during [configuration](#configuration) to know when the AXP Omni SDK Messaging UI is initialized successfully. The `onInitialized()` callback is called when the SDK is initialized successfully. The instance on which the initialization occurred is passed as an argument to the callback.

#### When to initialize

Since the initialization process creates a new session for the User, it should be done whenever the User changes. See [shutdown](#shutting-down) section to know how to end the previous User's session when the current User changes.

Since, the AXP Omni SDK Messaging UI doesn't authenticate the User, it gives the flexibility to the Client Website to decide when to initialize the AXP Omni SDK Messaging UI. The initialization can be done when the User logs in or whenever the User clicks on the messaging bubble, or any other flow that your website has.

To know when a User has clicked on the messaging bubble, the AXP Omni SDK Messaging UI provides a callback `onMessageBubbleClicked` which is called when the User clicks on the messaging bubble. This callback must be provided during [configuration](#configuration).

The `onMessageBubbleClicked` callback automatically receives the instance of the `<axp-omni-sdk-messaging-ui>` Web Component on which the User had clicked. This instance can be used to call the `init` method to initialize the AXP Omni SDK Messaging UI.

### Shutting down

Whenever the User changes or the User logs out, the AXP Omni SDK Messaging UI should be shut down to end the current User's session. Post that the AXP Omni SDK Messaging UI can be re-[initialized](#initialization) for the new User.

To shutdown, the AXP Omni SDK Messaging UI provides a `shutdown()` method on the instance of the `<axp-omni-sdk-messaging-ui>` Web Component. The `shutdown()` method returns a `Promise` which resolves when the AXP Omni SDK Messaging UI is shut down successfully.

**Example:**

```ts
import { AxpOmniSdkMessagingUi } from "@avaya/axp-omni-sdk-messaging-ui";

const axpOmniSdkMessagingUi = AxpOmniSdkMessagingUi.getInstance();

await axpOmniSdkMessagingUi.shutdown();
```

Alternatively, you can also listen to the shutdown event by providing the `onShutdown()` callback during [configuration](#configuration). The `onShutdown()` callback is called when the SDK is shut down. The instance on which the shutdown event occurred is passed as an argument to the callback.

### User Activity

The AXP Omni SDK Messaging UI internally has two timers to track the User's inactivity.

The first timer is the idle timer which is started right after the session is created. This timer expires when there are no activities for the configured duration. Once this timer expires the AXP Omni SDK Messaging UI will emit the Idle Timeout Invoked event and provide the configured grace period duration in the event's payload. The Client can show an appropriate message on the UI, warning the User about inactivity, by handling this event. Any activity from the User like sending a message etc will reset this timer.

The second timer is idle shutdown grace timer which runs after the idle timer has expired. This timer provides additional grace period for User or the Client to extend the session. After this timer expires, the session is terminated automatically and the AXP Omni SDK Messaging UI will raise the shutdown event and shut itself down (see [shutdown](#shutting-down) section for more details). If the Client wants to continue it must be reinitialize the SDK to do so.

Both the timeout values can be [configured](#configuration).

Developers can listen to the Idle Timeout Invoked event by providing the `onIdleTimeout()` callback during [configuration](#configuration). Alternatively, developers can also add listener for the Idle Timeout Invoked event by calling the static method `addIdleTimeOutInvokedListener()` on the class `AxpOmniSdkMessagingUi`. Regardless of which approach is used, the callback will be called when the User is considered idle. And the instance on which the event occurred is passed as an argument to the callback.

#### Extending the session

The AXP Omni SDK Messaging UI provides a static method `resetIdleTimeout()` on the class `AxpOmniSdkMessagingUi` to reset the idle timer. This method helps the Client Website to extend the session in scenarios where the Client Website is aware that the User is active based on events from its UI.

### Custom display strings and translations

The AXP Omni SDK Messaging UI provides an option to customize the display strings used in the UI. This can be done by providing the `displayStrings` configuration during [initialization](#configuration).

Check out the [`DisplayStrings`](https://avayaexperienceplatform.github.io/omni-sdk-js/types/_avaya_axp_omni_sdk_messaging_ui.DisplayStrings.html) type exported by the AXP Omni SDK Messaging UI to know the strings that can be customized.

The `displayNames` property of the `DisplayStrings` can take either [`TextConfig`](https://avayaexperienceplatform.github.io/omni-sdk-js/types/_avaya_axp_omni_sdk_messaging_ui.TextConfig.html) or [`displayNameModifier`](https://avayaexperienceplatform.github.io/omni-sdk-js/types/_avaya_axp_omni_sdk_messaging_ui.DisplayNameModifier.html) callback function as a value for each of the participants. This function provides participant name as the parameter and expects a string in return.

The locale of the messaging UI can be changed by calling the static method `setLocale()` on the class `AxpOmniSdkMessagingUi`, which takes the locale string as an argument.

Note: The custom display name to use for anonymous user can be provided through the `userDetails`.

### Theme Customization

The AXP Omni SDK Messaging UI provides an option to customize the visual elements of the UI like colors, fonts, icons etc. Developers can create multiple themes and pass them to the AXP Omni SDK Messaging UI in the `themeCustomizations` in the [configuration](#configuration).

The themes can be changed by calling the static method `setTheme()` on the class `AxpOmniSdkMessagingUi`.

The [`AxpOmniSdkMessagingUiTheme`](https://avayaexperienceplatform.github.io/omni-sdk-js/types/_avaya_axp_omni_sdk_messaging_ui.AxpOmniSdkMessagingUiTheme.html) type exported by the AXP Omni SDK Messaging UI provides the structure of the theme object and all available options that can be changed. The options are organized by the various regions in the UI.

### Other utilities and methods

#### Instance Properties

The AXP Omni SDK Messaging UI provides the following properties on `AxpOmniSdkMessagingUi` class instance:

- `initialized`: A boolean value indicating whether the AXP Omni SDK Messaging UI is initialized or not. This is available on the instance of the `AxpOmniSdkMessagingUi` class.

#### Static Properties

The AXP Omni SDK Messaging UI provides the following static properties on `AxpOmniSdkMessagingUi` class:

- `currentThemeName`: The name of the current theme being used by the AXP Omni SDK Messaging UI. This is available as a static property of the `AxpOmniSdkMessagingUi` class.

#### Instance Methods

The AXP Omni SDK Messaging UI provides the following methods on `AxpOmniSdkMessagingUi` class instance:

- `minimize()`: Minimizes the AXP Omni SDK Messaging UI to the messaging bubble. This is available as a static method of the `AxpOmniSdkMessagingUi` class.
- `maximize()`: Maximizes the AXP Omni SDK Messaging UI from the messaging bubble. This is available as a static method of the `AxpOmniSdkMessagingUi` class. This method can be called only when the AXP Omni SDK Messaging UI has been initialized.

#### Static Methods

The AXP Omni SDK Messaging UI provides the following static methods on `AxpOmniSdkMessagingUi` class:

- `setLogLevel()` : Sets the log level for the AXP Omni SDK Messaging UI. This is available as a static method of the `AxpOmniSdkMessagingUi` class.
- `setShutdownListener()`: Sets the event handler callback that needs to be invoked when the AXP Omni SDK Messaging UI is shutdown. This method will reset the event handler callback that was previously configured in the global configuration object `axpOmniSdkMessagingUiConfig` (of type `AxpOmniSdkMessagingUiConfig`).
- `setIdleTimeOutInvokedListener()`: Sets the event handler callback that needs to be invoked when the idle timeout is reached. This method will reset the event handler callback that was previously configured in the global configuration object `axpOmniSdkMessagingUiConfig` (of type `AxpOmniSdkMessagingUiConfig`).
- `setInitializedListener()`: Sets the event handler callback that needs to be invoked when the AXP Omni SDK Messaging UI is initialized. This method will reset the event handler callback that was previously configured in the global configuration object `axpOmniSdkMessagingUiConfig` (of type `AxpOmniSdkMessagingUiConfig`).
- `clearShutdownListener()`: Clears the event handler callback that was attached to the AXP Omni SDK Messaging UI shutdown event. This method will remove the event handler callback that was previously configured in the global configuration object `axpOmniSdkMessagingUiConfig` (of type `AxpOmniSdkMessagingUiConfig`).
- `clearIdleTimeOutInvokedListener()`: Clears the event handler callback that was attached to the AXP Omni SDK Messaging UI idle timeout event. This method will remove the event handler callback that was previously configured in the global configuration object `axpOmniSdkMessagingUiConfig` (of type `AxpOmniSdkMessagingUiConfig`).
- `clearInitializedListener()`: Clears the event handler callback that was attached to the AXP Omni SDK Messaging UI initialization event. This method will remove the event handler callback that was previously configured in the global configuration object `axpOmniSdkMessagingUiConfig` (of type `AxpOmniSdkMessagingUiConfig`).
