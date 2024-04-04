# Sample Web Application

## Introduction

This JavaScript based sample web application demonstrates how to quickly integrate a web application with the Messaging UI SDK and enable it with AXP Messaging capabilities.

## Steps to Run Sample Web Application

1. **Add SDK Files to the Sample Application Project**

   Download the `.tar.gz` files from [omni-sdk](../omni-sdk) folder in your project.

2. **Install the Tarballs**

   Run the following command in your project to install the required dependencies:

    ```bash
    npm install ./avaya-axp-client-sdk-core-0.0.1.tgz ./avaya-axp-client-sdk-messaging-0.0.1.tgz ./avaya-axp-messaging-ui-sdk-0.0.1.tgz
    ```

3. **Install the remaining dependencies**
    Run the following command in your project to install the remaining dependencies used by the sample web application:

    ```bash
    npm install
    ```

4. **Provide configurations**
    Open the [config.js](./config.js) file and update the required properties. It is mandatory to provide the correct values for `integrationId`, `appKey`, `host`, and `jwtUrl`.

5. **Build the sample web application**
    Build the web application by running the following command:

    ```bash
    npm run build
    ```

6. **Start the sample web application**
    Start the web application by running the following command:

    ```bash
    npm start
    ```

    By default the sample web application will start listening on port `8080`. Check the console logs to confirm the port of the application.

7. **Access the sample web application**
    Open a browser and navigate to `http://localhost:<port>`. Once the page is loaded, click on the message bubble to start your messaging conversation.
