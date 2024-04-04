# AXP Messaging UI

AXP Messaging UI SDK provides a highly customizable user interface as a [Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for messaging that can be easily integrated into the Client website to enable messaging capabilities. It empowers developers to finely tailor the messaging interface, allowing customization of colors, strings, icons, typography, etc., to meet the specific visual requirements of your application.

The AXP Messaging UI is build on top of [AXP Core](/modules/_avaya_axp_client_sdk_core) and [AXP Messaging](/modules/_avaya_axp_client_sdk_messaging) SDKs. Before using the AXP Messaging UI SDK, please refer to [this page](https://developers.avayacloud.com/avaya-experience-platform/docs/introduction#next-steps) for a list of prerequisites.

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

To install the AXP Messaging UI SDK, run the following command:

```bash
npm install @avaya/axp-messaging-ui-sdk
```

The AXP Messaging UI SDK depends on the AXP Core SDK and AXP Messaging SDK, which would be installed alongside the AXP Messaging UI SDK.

## Usage

The AXP Messaging UI SDK exports a Web Component `<axp-messaging-ui-sdk>` that can be used in your HTML code. Once the browser encounters the web component `<axp-messaging-ui-sdk>` in the HTML document, it will instantiate it and the component will be rendered onto the screen. **Hence, it is important to note that all the configurations must be done before the component can be render. This is to make sure it picks up the correct configuration values while rendering. These configurations include the required AXP related configurations, callbacks and optional customizations.**

### Configuration

As stated above the AXP Messaging UI SDK requires some configurations to be set before it can be rendered. This should be done by setting an config object by name `AxpMessagingUiConfig` on the `window` object before loading your website's script that uses (imports) the AXP Messaging UI SDK.

**Example:**

Configuration script: `axp-messaging-ui-config.js`

```js
// Configuration script - axp-messaging-ui-config.js
window.AxpMessagingUiConfig = {
  // Required AXP configurations
  // Full list of AXP configurations are ignored here for brevity. Please refer to the Configuration options section below to know more.
}
```

```js
// Alternatively, you can declare the config object using the `var` keyword.
var AxpMessagingUiConfig = {
  // ...
}
```

Your website's script that uses the AXP Messaging UI SDK: `your-website-script.js`

```js
import { AxpMessagingUiSdk } '@avaya/axp-messaging-ui-sdk';

// Your code ...
```

Your website's main HTML file: `index.html`

```html
<!-- Your index.html -->
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Messaging-App-UI</title>
    <script src="/path/to/axp-messaging-ui-config.js"></script>
    <script src="/path/to/your-website-script.js" type="module"></script>
</head>
<body>
    <axp-messaging-ui-sdk></axp-messaging-ui-sdk>
</body>
</html>
```

#### Configuration options

The AXP Messaging UI SDK supports following configuration options:

| Option                           | Type       | Required/Optional  | Description                                                                                            |
|----------------------------------|------------|----------|------------------------------------------------------------------------------------------------------------------|
| `host` | `string`   | Required      | The region of the AXP server.                                                                                    |
| `integrationId` | `string`   | Required      | The unique 36 character Integration ID available to your account administrator when the integration was created. |
| `appKey` | `string` | Required      | The unique key associate with tenant in case of APIXH integration.                                               |
| `sessionParameters` | `object`   | Optional       | The session parameters to be passed to the AXP server.                                                           |
| `logLevel` | `LogLevel` | Optional       | The log level for the AXP Messaging UI SDK. Default is `WARN`.                                                  |
| `idleTimeoutDuration`            | `number`   | Optional       | The duration in milliseconds after which the user is considered idle.                                            |
| `idleShutdownGraceTimeoutDuration`| `number`   | Optional       | The duration in milliseconds after idle timeout after which and the session is closed automatically due to user inactivity. |
| `locale`                         | `string`   | Optional       | The locale to be used for the AXP Messaging UI SDK. Default is `en-US`.                                         |
| `onMessageBubbleClicked`         | `function` | Optional      | The callback function to be called when the message bubble is clicked.                                           |
| `onInit`                         | `function` | Optional       | The callback function to be called when the AXP Messaging UI SDK is initialized for the current User (identified by the JWT). |
| `onShutdown`                     | `function` | Optional       | The callback function to be called when the current session for the current User is closed.                     |
| `onIdleTimeout`                  | `function` | Optional       | The callback function to be called when the current User is considered idle.                                     |
| `onLocationRequest`              | `function` | Optional       | The callback function to be called when the User is requested to share their location.                           |
| `beforeMessageSend`              | `function` | Optional       | The callback function to be called before a message is sent.                                                     |
| `beforeMessageRender`            | `function` | Optional       | The callback function to be called before a message is rendered on the screen.                                   |
| `displayStrings`                 | `DisplayStrings` | Optional | An object containing the display strings and their translations to be used in the AXP Messaging UI SDK. See [custom display strings and translations](#custom-display-strings-and-translations) section. |
| `emojiMartTranslations`          | `Record<Language,EmojiMartTranslation>` | Optional | AXP Messaging UI SDK uses [Emoji Mart](https://github.com/missive/emoji-mart) Component as emoji picker. This configuration expects an object containing the display strings and their translations to be used for the emoji mart component. |
| `themeCustomizations`            | `Record<string, AxpMessagingUiTheme>` | Optional | An object containing the theme customizations for the AXP Messaging UI SDK. Each key is a theme name and the value is the customizations for that theme. See [theme customization](#theme-customization) section. |
| `defaultTheme`                   | `string`   | Optional       | Name of the default theme out of the themes provided via the `themeCustomizations` configuration to be used for the AXP Messaging UI SDK. |

### Authentication

The AXP Messaging UI SDK doesn't authenticate the User. It expects the User to be authenticated by your website and its backend web application. The AXP Messaging UI SDK uses JSON Web Tokens (JWT) and requires a valid JWT to function. The JWT is obtained from your own backend web application that communicates with AXP's authentication API.

The AXP Messaging UI SDK expects an implementation of the `JwtProvider` interface to be provided during [initialization](#initialization). The `JwtProvider` implementation must have two methods:

1. `onExpiryWarning`: This method is called when the JWT is about to expire. In the argument of this method, the remaining time in milliseconds before the JWT expires is provided.
2. `onExpiry`: This method is called when the JWT has expired.

**The consumers of SDK should call the `AxpMessagingUiSdk.setJwt()` to provide a new JWT to the SDK.**

JWT Provider example (in TypeScript):

```ts
import { JwtProvider } from '@avaya/axp-messaging-ui-sdk';

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

Before the User can start sending messages, the AXP Messaging UI SDK must be initialized. The initialization process creates a new session for the current user (identified by the JWT) post which the user can start sending messages. The initialization can be done by calling the `init` method on the instance of the `<axp-messaging-ui-sdk>` Web Component. The AXP Messaging UI SDK exports the class responsible for the Web Component as `AxpMessagingUiSdk`.

It can be imported as follows:

```ts
import { AxpMessagingUiSdk } from '@avaya/axp-messaging-ui-sdk';
```

Once imported, the instance can be procured by using the static method `getInstance()` on the class `AxpMessagingUiSdk`. The `init` method can then be called on the returned instance object to initialize the AXP Messaging UI SDK.

**⚠️ Important Note: Currently AXP Messaging UI SDK supports a single instance, using multiple instances of the `<axp-messaging-ui-sdk>` can lead to unpredictable behavior.**

**Example:**

```js
const axpMessagingUi = AxpMessagingUiSdk.getInstance();

// Arguments excluded in this example for brevity.
axpMessagingUi.init(...);
```

The `init()` method takes an object with the following properties:

- `jwtProvider`: An implementation of the `JwtProvider` interface. See [Authentication](#authentication) section.
- `userName` (optional): The name of the current User to be displayed in the AXP Messaging UI SDK.
- `jwt`: The JWT for the current User.
- `contextParameters` (optional): The context parameters to be passed to the AXP server for routing.
- `sessionParameters` (optional): The session parameters to be passed to the AXP server.

The `init()` method returns a `Promise` which resolves when the AXP Messaging UI SDK is initialized successfully.

Full example:

```ts
import { AxpMessagingUiSdk } from '@avaya/axp-messaging-ui-sdk';

const axpMessagingUi = AxpMessagingUiSdk.getInstance();

const axpMessagingUiInitParameters = {
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
await axpMessagingUi.init(axpMessagingUiInitParameters);
```

#### Waiting for initialization

As shown in above example the `init()` method returns a `Promise` which resolves when the AXP Messaging UI SDK is initialized successfully, developers can `await` on this promise.

Alternatively, developers can also listen to the `onInit` callback provided during [configuration](#configuration) to know when the AXP Messaging UI SDK is initialized successfully. The `onInitialized()` callback is called when the SDK is initialized successfully. The instance on which the initialization occurred is passed as an argument to the callback.

#### When to initialize

Since the initialization process creates a new session for the User, it should be done whenever the User changes. See [shutdown](#shutting-down) section to know how to end the previous User's session when the current User changes.

Since, the AXP Messaging UI SDK doesn't authenticate the User, it gives the flexibility to the Client Website to decide when to initialize the AXP Messaging UI SDK. The initialization can be done when the User logs in or whenever the User clicks on the messaging bubble, or any other flow that your website has.

To know when a User has clicked on the messaging bubble, the AXP Messaging UI SDK provides a callback `onMessageBubbleClicked` which is called when the User clicks on the messaging bubble. This callback must be provided during [configuration](#configuration).

The `onMessageBubbleClicked` callback automatically receives the instance of the `<axp-messaging-ui-sdk>` Web Component on which the User had clicked. This instance can be used to call the `init` method to initialize the AXP Messaging UI SDK.

### Shutting down

Whenever the User changes or the User logs out, the AXP Messaging UI SDK should be shut down to end the current User's session. Post that the AXP Messaging UI SDK can be re-[initialized](#initialization) for the new User.

To shutdown, the AXP Messaging UI SDK provides a `shutdown()` method on the instance of the `<axp-messaging-ui-sdk>` Web Component. The `shutdown()` method returns a `Promise` which resolves when the AXP Messaging UI SDK is shut down successfully.

**Example:**

```ts
import { AxpMessagingUiSdk } from '@avaya/axp-messaging-ui-sdk';

const axpMessagingUi = AxpMessagingUiSdk.getInstance();

await axpMessagingUi.shutdown();
```

Alternatively, you can also listen to the shutdown event by providing the `onShutdown()` callback during [configuration](#configuration). The `onShutdown()` callback is called when the SDK is shut down. The instance on which the shutdown event occurred is passed as an argument to the callback.

### User Activity

The AXP Messaging UI SDK internally has two timers to track the User's inactivity.

The first timer is the idle timer which is started right after the session is created. This timer expires when there are no activities for the configured duration. Once this timer expires the Avaya Messaging UI SDK will emit the Idle Timeout Invoked event and provide the configured grace period duration in the event's payload. The Client can show an appropriate message on the UI, warning the User about inactivity, by handling this event. Any activity from the User like sending a message etc will reset this timer.

The second timer is idle shutdown grace timer which runs after the idle timer has expired. This timer provides additional grace period for User or the Client to extend the session. After this timer expires, the session is terminated automatically and the AXP Messaging UI SDK will raise the shutdown event and shut itself down (see [shutdown](#shutting-down) section for more details). If the Client wants to continue it must be reinitialize the SDK to do so.

Both the timeout values can be [configured](#configuration).

Developers can listen to the Idle Timeoout Invoked event by providing the `onIdleTimeout()` callback during [configuration](#configuration). Alternatively, developers can also add listener for the Idle Timeout Invoked event by calling the static method `addIdleTimeOutInvokedListener()` on the class `AxpMessagingUiSdk`. Regardless of which approach is used, the callback will be called when the User is considered idle. And the instance on which the event occurred is passed as an argument to the callback.

#### Extending the session

The AXP Messaging UI SDK provides a static method `resetIdleTimeout()` on the class `AxpMessagingUiSdk` to reset the idle timer. This method helps the Client Website to extend the session in scenarios where the Client Website is aware that the User is active based on events from its UI.

### Custom display strings and translations

The AXP Messaging UI SDK provides an option to customize the display strings used in the UI. This can be done by providing the `displayStrings` configuration during [initialization](#configuration).

Check out the `{@link DisplayStrings}` type exported by the AXP Messaging UI SDK to know the strings that can be customized.

The language of the messaging ui can be changed by calling the static method `setLocale()` on the class `AxpMessagingUiSdk`, which takes the locale string as an argument.

### Theme Customization

The AXP Messaging UI SDK provides an option to customize the visual elements of the UI like colors, fonts, icons etc. Developers can create multiple themes and pass them to the AXP Messaging UI SDK in the `themeCustomizations` in the [configuration](#configuration).

The themes can be changed by calling the static method `setTheme()` on the class `AxpMessagingUiSdk`.

The `{@link AxpMessagingUiTheme}` type exported by the AXP Messaging UI SDK provides the structure of the theme object and all available options that can be changed. The options are organized by the various regions in the UI.

### Other utilities and methods

#### Properties

The AXP Messaging UI SDK provides the following properties:

- `currentTheme`: The name of the current theme being used by the AXP Messaging UI SDK. This is available as a static property of the `AxpMessagingUiSdk` class.
- `initialized`: A boolean value indicating whether the AXP Messaging UI SDK is initialized or not. This is available on the instance of the `AxpMessagingUiSdk` class.

#### Methods

- `minimize()`: Minimizes the AXP Messaging UI SDK to the messaging bubble. This is available as a static method of the `AxpMessagingUiSdk` class.
- `maximize()`: Maximizes the AXP Messaging UI SDK from the messaging bubble. This is available as a static method of the `AxpMessagingUiSdk` class. This method can be called only when the AXP Messaging UI SDK has been initialized.
- `setLogLevel()` : Sets the log level for the AXP Messaging UI SDK. This is available as a static method of the `AxpMessagingUiSdk` class.

#### Attributes

The AXP Messaging UI SDK provides the following attributes:

- `hide`: A boolean attribute that can be set on the `<axp-messaging-ui-sdk>` Web Component to hide the messaging UI. Example: `<axp-messaging-ui-sdk hide="true"><axp-messaging-ui-sdk>`
