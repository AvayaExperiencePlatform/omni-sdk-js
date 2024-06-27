# AXP Messaging

The AXP Messaging SDK module provides enables asynchronous communication, allowing end users to resume conversation threads at any time and view all previous messages exchanged as part of the conversation. This is unlike a session-based chat, where the chat is closed after the participants disconnect the dialog. The AXP Messaging module extends base Conversation with Messaging capabilities.

The AXP Messaging module depends on the AXP Core module. Please refer to the [AXP Core documentation](./core.md) before using the Messaging module.

## Main features

1. **Message History**: The AXP Messaging module provides a message history feature that allows users to view all messages exchanged in a conversation thread.
2. **Resume Conversation**: The AXP Messaging module allows users to resume a messaging conversation thread at any time.
3. **Send Message**: The AXP Messaging module allows users to send messages to other participants in a conversation thread.
4. **Receive Message**: The AXP Messaging module allows users to receive messages from other participants in a conversation thread.
5. **Send rich media messages**: The AXP Messaging module allows users to send rich media messages like Post back, replies and location to other participants in a conversation thread.
6. **Receive rich media messages**: The AXP Messaging module allows users to receive rich media messages like Post back, Replies and Location Request, Carousel etc, from other participants in a conversation thread.
7. **Send and receive attachments**: The AXP Messaging module allows users to send and receive attachments like images, videos, audio, documents etc, to other participants in a conversation thread.

## Installation

AXP Messaging module requires the AXP Core module.

To install the AXP Messaging module, download the [avaya-axp-client-sdk-core-0.2.0.tgz](./omni-sdk/avaya-axp-client-sdk-core-0.2.0.tgz) and [avaya-axp-client-sdk-messaging-0.2.0.tgz](./omni-sdk/avaya-axp-client-sdk-messaging-0.2.0.tgz) in your project and run the following command:

```bash
npm install ./avaya-axp-client-sdk-core-0.2.0.tgz ./avaya-axp-client-sdk-messaging-0.2.0.tgz
```

This will install both AXP Core and AXP Messaging.

## Usage

The AXP Messaging module provides the `AxpMessagingConversation` [mixin](https://www.typescriptlang.org/docs/handbook/mixins.html) that extends the Base Conversation of the AXP Core module. To use the Messaging module, you need to import the `AxpMessagingConversation` mixin function and apply it. Check out more details about additional functionalities in the [Using additional functionality](./core.md#using-additional-functionalities) section of The AXP Core's documentation.

Example of how to use AXP Messaging module:

```ts
// Note: Here ... (dot dot dot) indicates the rest of the code, which is excluded for brevity.

import { AxpClientSdk } from '@avaya/axp-client-sdk-core';
import { AxpMessagingConversation } from '@avaya/axp-client-sdk-messaging';

const EnhancedConversationClass = AxpMessagingConversation();

const userSession = await AxpClientSdk.init({...}, EnhancedConversationClass);

const defaultConversation = userSession.conversations[0];

// The `defaultConversation` object has methods of both AXP Core and Messaging modules.
defaultConversation.addParticipantAddedListener(...) // <-- AXP Core method
defaultConversation.sendMessage(...); // <-- AXP Messaging method
```

## Messaging Conversation

Messaging Conversation provides APIs to send and receive rich media and attachment messages, get conversation history and listen to message events. For more details on the APIs exposed on the Messaging Conversation, refer to the `AxpMessagingConversationTrait` interface.

### Getting conversation history

To get the conversation history, use the `getMessages()` method on the Conversation. The `getMessages()` method returns a `PageIterator` object that can be used to iterate over the messages in the conversation. The `getMessages()` API takes an optional parameter `pageSize` which specifies the number of messages to fetch in a single page. The default value of `pageSize` is 10 and maximum page size is 50.

Note: The iterator can only be used to get messages conversed in the conversation from start up until the point the iterator was created. For newer messages please listen to the message events. Do not use the `getMessages()` API to get new messages.

Each Page of the iterator contains a list of messages. As the page number increases, the messages are older. The iterator can be used to get messages in both directions (forward and backward).

The `PageIterator.previous()` and `PageIterator.next()` are async methods, when called they fetch the previous and next page of messages respectively and each resolves with an Array of `Message`. The `PageIterator.hasNext()` and `PageIterator.hasPrevious()` methods check if there are more messages in the next and previous pages, respectively.

At any point `PageIterator.items` can be used to get the messages on the current page.

```ts
function showMessagesOnUI(messages) {
	// Logic to show messages on UI.
	// ...
}

const iterator = await conversation.getMessages(15);

showMessagesOnUI(iterator.items);

const loadMore = document.getElementById("load-more-button");

loadMore.onclick = function () {
	if (iterator.hasPrevious()) {
		const previousPage = await iterator.previous();
		showMessagesOnUI(previousPage);
	}
};
```

### Sending messages

The AXP Messaging module supports sending various types of messages, including:

- Text(Plain text, Emoji's, Links)
- Postback
- Reply
- Attachment
- Location

To send a message, use the `sendMessage()` method on the Conversation. The `sendMessage()` method takes a `SendMessageRequest` object as a parameter. Based on the type of message you want to send, you can use one of the following implementations of `SendMessageRequest` to construct your message:

- `SendTextMessage`: To send a plain text message.
- `SendMessagePostBackAction`: To send a post back message.
- `SendMessageReplyAction`: To send a reply message.
- `SendMessageAttachment`: To send an attachment message.
- `SendMessageLocation`: To send a location message.

#### Sending plaintext messages

To send a plain text message, use the `SendTextMessage` class to build your message. The `SendTextMessage` class constructor takes a `text` and an optional `parentMessageId` parameter. The `parentMessageId` is the messageId of the message to which the current message is a reply.

```ts
const message = new SendTextMessage("Hi");
conversation.sendMessage(message);
```

#### Sending rich media reply messages

To send a rich media reply message, use the `SendMessageReplyAction` class to build your message. The `SendMessageReplyAction` class constructor takes in the action `payload` of the selected action from the list of actions in the message received from Agent. Along with `payload`, you can also pass optional arguments `actionText`, `iconUrl` and the `parentMessageId` parameter. Here the `parentMessageId` can be used to specify the Agent's reply request rich media message to which this current message is a reply.

```ts
const message = new SendMessageReplyAction(
	"CUSTOMER_HAPPY",
	"Happy",
	"https://example.com/happy.png",
	"acbc012d-1b73-4e1b-98c9-fe64e7ab2b41",
);
conversation.sendMessage(message);
```

#### Sending rich media postback messages

To send a rich media postback message, use the `SendMessagePostBackAction` class to build your message. The `SendMessagePostBackAction` class constructor takes in the action `payload` of the selected action from the list of actions in the message received from Agent. Along with `payload`, you can also pass optional arguments `actionText` and the `parentMessageId` parameter. Here the `parentMessageId` can be used to specify the Agent's post back request rich media message to which this current message is a reply.

```ts
const message = new SendMessagePostBackAction("SHIP_TO_HOME", "Ship to home", "acbc012d-1b73-4e1b-98c9-fe64e7ab2b41");
conversation.sendMessage(message);
```

#### Sending location messages

To send a location message, use the `SendMessageLocation` class to build your message. The `SendMessageLocation` class constructor takes in the `latitude`, `longitude`, and optional arguments `name` and `address`, `parentMessageId`. The `parentMessageId` is the messageId of the message to which the current message is a reply.

The `name` and `address` are optional parameters that can be used to provide additional information about the location.

```ts
const message = new SendMessageLocation(0, 0, "North Pole of the Earth", "North Pole");
conversation.sendMessage(message);
```

#### Sending attachment messages

To send an attachment message, use the `SendMessageAttachment` class to build your message. The `SendMessageAttachment` class constructor takes in the `File` object and optional arguments `text` (optional text to send along side the file), `parentMessageId`. The `parentMessageId` is the messageId of the message to which the current message is a reply. The `SendMessageAttachment` class can be used to send images as well.

```ts
const fileInput = document.getElementById("file-input");
let selectedFile;

fileInput.onchange = function () {
	selected = fileInput.files[0];
};

const sendAttachmentButton = document.getElementById("send-attachment-button");

sendAttachmentButton.onclick = function () {
	const message = new SendMessageAttachment(
		selectedFile,
		"Here is the invoice",
		"acbc012d-1b73-4e1b-98c9-fe64e7ab2b41",
	);
	conversation.sendMessage(message);
};
```

### Waiting for message to be sent

The `sendMessage()` API returns a `Promise` that resolves with the `Message` object corresponding to the message that sent. This object contains unique `messageId` of this message and other details.

### Message delivery

The Client must listen to the the Message Delivered event to be notified when the messages that were sent by the User are delivered to the AXP. To do so the Client use the `addMessageDeliveredListener()` method on the Conversation object to register the Message Delivered event listener. The `addMessageDeliveredListener()` method the listener function as the argument. The listener will be called with the Message object corresponding to the message that sent. The Message object contains unique `messageId` of this message and other details.

```ts
function showTickOnUI(message) {
	// Logic to show tick on UI.
	// ...
}

conversation.addMessageDeliveredListener((message) => {
	showTickOnUI(message);
});
```

### Receiving messages

The Client must listen to the the Message Arrived event to be notified when the messages are received from the Agent. To do so the Client use the `addMessageArrivedListener()` method on the Conversation object to register the Message Arrived event listener. The `addMessageArrivedListener()` method the listener function as the argument. The listener will be called with the Message object corresponding to the message that received. The Message object contains the unique `messageId` and body of the message sent by the Agent.

```ts
function showMessagesOnUI(message) {
	// Logic to show messages on UI.
	// ...
}

conversation.addMessageArrivedListener((message) => {
	showMessagesOnUI(message);
});
```

## Axp Messaging Namespace

The AXP Messaging module consists of `AxpMessaging` namespace which contains a set of APIs which aren't directly coupled to the concept of Messaging Conversation. This namespace consists of APIs and Events related to the networking model used by the AXP Messaging to get messages and events from AXP.

During the session, the state of SDK’s connection with AXP Servers can change. In all the cases the network state changes are notified in the form of events. The Client can subscribe to these events for handling the changes in network.

List of Events:

| Event Name              | Description                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Event Stream Connecting | This event is raised when the SDK tries to connect with the event stream.                                                                                               |
| Event Stream Connected  | This event is raised when the SDK’s connection attempt was successful, and the connection with AXP is established.                                                      |
| Event Stream Failed     | This event is raised when the event stream breaks/fails due to some reason. Details like the reason for failure as well as next retry attempt is provided in the event. |
| Event Stream Closed     | This event is raised when the SDK disconnects itself from the event stream.                                                                                             |

The Client can use `add/remove` methods exposed by the `AxpMessaging` namespace to subscribe/unsubscribe to these events.

Example:

```ts
import { AxpMessaging } from "@avaya/axp-client-sdk-messaging";

AxpMessaging.addEventStreamConnectingListener((eventPayload) => {
	// Show connecting on UI.
});

AxpMessaging.addEventStreamConnectedListener((eventPayload) => {
	// Show connected on UI.
});

AxpMessaging.addEventStreamFailedListener((eventPayload) => {
	// Show network disconnected on UI.
	console.log(
		`SDK disconnected due to ${eventPayload.reason}, next retry attempt will be made after ${eventPayload.retryAfter} seconds.`,
	);
});

AxpMessaging.addEventStreamClosedListener((eventPayload) => {
	// Show connection closed on UI.
});
```

After disconnection, the SDK will try to reconnect with AXP until the reconnection window expires. The will try to make multiple attempts to reconnect with AXP. The interval between each subsequent attempt will keep on increasing till the reconnection window (5 minutes) expires. If the SDK is unable to reconnect within the reconnection window, the SDK will stop trying to reconnect.

Post this, the Client can make an explicit attempt to retry connecting with AXP. To do so, the Client must call the `retryConnection()` method exposed by the `AxpMessaging` namespace.

```ts
import { AxpMessaging } from "@avaya/axp-client-sdk-messaging";

AxpMessaging.retryConnection();
```

This method is not an `async` method and a successful return of this method doesn't guarantee that the SDK has been connected with AXP yet, instead the Client should subscribe to the Event Stream Connected event. In case of failure during the manual retry attempt, the Client will be notified via the Event Stream Failed event.

If the manual retry is successful, the Client will be notified via the Event Stream Connected event and the SDK will resume its connection with AXP.

Calling `retryConnection()` method when the SDK is disconnected but within the reconnection window will just reset the delay interval between the subsequent attempts and will attempt to reconnect immediately.

Calling `retryConnection()` method when the SDK is not disconnected will throw an Error.
