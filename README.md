# picoclaw snap

Snap packaging for [PicoClaw](https://github.com/commandoperator/cmdop-sdk-js) — a lightweight, high-speed CMDOP agent plugin for Node.js.

## Building

```
snapcraft
```

Snapcraft will install `picoclaw` from the npm registry, bundling Node.js 22.

## Installing

```
sudo snap install picoclaw_<version>_amd64.snap
```

## Usage

```
picoclaw configure    # configure CMDOP API key
picoclaw             # run the agent plugin
```

## Design notes

**npm library** — PicoClaw is currently a programmatic Node.js library (no bin entry). The launcher invokes its `index.js` entry point directly; update `snap/local/bin/picoclaw-launch` once a dedicated CLI entry is added to the package.

**Strict confinement** — PicoClaw is a gRPC client that communicates with CMDOP servers over the network with no need for broad filesystem access, so strict confinement is used with `home` and `network` plugs.

**No daemon** — PicoClaw is a client plugin, not a server. There is no background service.
