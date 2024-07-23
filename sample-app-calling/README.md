# AXP Calling ES JavaScript example

WebRTC requires client to connect using HTTPS. So to run the sample app you'll need to deploy it
to a server with a public or self signed certificates. We'll use http-server for testing.

# Development

## 1. Install AXP Omni SDK Core and Calling libraries if needed

npm install ./avaya-axp-omni-sdk-core-0.0.1.tgz ./avaya-axp-omni-sdk-calling-0.0.1.tgz

## 2. Update config settings in src/index.ts

const config = {
integrationId: "<integrationId>",
appKey: "<appKey>",
axpHostName: "<axpHostName>",
callingRemoteAddress: "<phoneNumber>"
};

## 3. Build sample app

npm run build

## 4. Setup Certificates

Note: Certificates **MUST** be trusted for live reloading to work.
(Reload server is on a separate port and would need to be overridden separately.)

```shell
brew install mkcert
brew install nss # if you use Firefox

mkcert -install
```

For other systems see https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation

```shell
cd sample-app-calling/ # ensure you're in this directory
mkcert -key-file key.pem -cert-file cert.pem 127.0.0.1
```

## 5. Run Local Server

```shell
npm run serve
# bonus tip: run in your IDE to see build errors
```

And navigate to https://127.0.0.1:8080/public (Note: Avaya Experience Platform CORS will **NOT** work with `localhost`!)

This page will automatically reload when source files are changed.
