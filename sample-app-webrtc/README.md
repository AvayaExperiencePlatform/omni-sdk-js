# AXP WebRTC ES JavaScript example

WebRTC requires client to connect using HTTPS. So to run the sample app you'll need to deploy it
to a server with a public or self signed certificates. We'll use http-server for testing.

## Development

### 1. Setup Certificates

Note: Certificates **MUST** be trusted for live reloading to work.
(Reload server is on a separate port and would need to be overridden separately.)

```shell
brew install mkcert
brew install nss # if you use Firefox

mkcert -install
```

For other systems refer to [this link](https://github.com/FiloSottile/mkcert?tab=readme-ov-file#installation).

```shell
cd sample-app-calling/ # ensure you're in this directory
mkcert -key-file key.pem -cert-file cert.pem 127.0.0.1
```

### 2. Run Local Server

```shell
npm run serve
# bonus tip: run in your IDE to see build errors
```

And navigate to `https://127.0.0.1:8080/` (Note: Avaya Experience Platform CORS will **NOT** work with `localhost`!)

This page will automatically reload when source files are changed.
