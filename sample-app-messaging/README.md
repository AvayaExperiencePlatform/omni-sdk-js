# Sample Web Application

## Introduction

This JavaScript based sample web application demonstrates how to quickly integrate a web application with the AXP Omni SDK Messaging UI and enable it with AXP Messaging capabilities.

## Steps to Run Sample Web Application

1. **Clone or download the Omni JavaScript SDK repository**

   Clone or download the [Omni SDK Javascript repository](https://github.com/AvayaExperiencePlatform/omni-sdk-js) the `sample-app-messaging` is part of.

2. **Install the remaining dependencies**

   Change the directory to the `sample-app-messaging` folder and run the following command to install the dependencies used by the sample web application:

   ```bash
   npm install
   ```

3. **Provide configurations**

   Open the [config.ts](src/config.ts) file and update the required properties:

   - `tokenServerUrl`
   - `appKey`
   - `host`
   - `integrationId`

   **Optional**

   Open the [index.ts](src/index.ts) file and update the following parameters:

   - `sessionParameters`
   - `contextParameters`

4. **Build the sample web application**

   Build the web application by running the following command:

   ```bash
   npm run build
   ```

5. **Start the sample web application**

   Start the web application by running the following command:

   ```bash
   npm serve
   ```

   By default the sample web application will start listening on port `8080`. Check the console logs to confirm the port of the application.

6. **Access the sample web application**

   Open a browser and navigate to `http://localhost:<port>`. Once the page is loaded, click on the message bubble to start your messaging conversation.
