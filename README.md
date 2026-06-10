# picoclaw snap

Snap packaging for [PicoClaw](https://github.com/commandoperator/cmdop-sdk-js) — a lightweight, high-speed CMDOP agent plugin for Node.js.

## Building

```
snapcraft
```

Snapcraft will install `picoclaw` from the npm registry, bundling Node.js 22.

## Installing

```
sudo snap install --classic picoclaw_<version>_amd64.snap --dangerous
```

## Usage

PicoClaw is primarily a **programmatic library** (a themed wrapper around the
[`@cmdop/node`](https://cmdop.com/docs/sdk/node/) SDK), so the bundled command is
a thin self-check rather than a full agent CLI:

```
picoclaw doctor      # verify the SDK loads (offline self-check)
picoclaw version
picoclaw help
```

To use it programmatically:

```js
const { createPicoClaw } = require('picoclaw');
const client = await createPicoClaw({ /* CMDOP server URL + API key */ });
```

## Design notes

**npm library, no upstream CLI** — PicoClaw is a programmatic Node.js library with no `bin` entry. The snap ships a small CLI (`snap/local/bin/picoclaw-cli.js`) that self-checks the SDK (`doctor`) and prints version/help; the package is resolved via `NODE_PATH=$SNAP/lib/node_modules`. Extend it with real agent subcommands (built on `createPicoClaw()`) when wanted.

**Classic confinement** — Consistent with the other claw snaps: picoclaw bundles its own Node.js and performs agentic CMDOP work that benefits from broad host access. (Classic snaps use the host's dynamic linker, so the bundled node is not patchelf'd.)

**No daemon** — PicoClaw is a client, not a server. There is no background service.
