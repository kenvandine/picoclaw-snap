#!/usr/bin/env node
'use strict';
// picoclaw CLI — PicoClaw is primarily a programmatic library (a themed wrapper
// around the @cmdop/node SDK).  Upstream ships no CLI entry point, so this thin
// wrapper provides a self-check ('doctor') plus version/help, and points users
// at the programmatic API.  Resolved via NODE_PATH=$SNAP/lib/node_modules set
// by picoclaw-launch.

const pkg = require('picoclaw/package.json');

function version() {
  console.log(`picoclaw ${pkg.version}`);
}

function help() {
  console.log(`PicoClaw ${pkg.version} — a CMDOP agent SDK (themed @cmdop/node wrapper).

PicoClaw is primarily a programmatic library:

  const { createPicoClaw } = require('picoclaw');
  const client = await createPicoClaw({ /* CMDOP server URL + API key */ });

Commands:
  doctor         Load the SDK and report its status (offline self-check)
  version        Print the PicoClaw version
  help           Show this help

Docs: https://cmdop.com/docs/sdk/node/`);
}

function doctor() {
  let pc;
  try {
    pc = require('picoclaw');
  } catch (err) {
    console.error(`picoclaw: failed to load the SDK: ${err.message}`);
    process.exit(1);
  }

  const hasFactory = typeof pc.createPicoClaw === 'function';
  const hasClient = typeof pc.CMDOPClient === 'function';

  console.log(`picoclaw ${pkg.version}`);
  console.log(`SDK (@cmdop/node): loaded`);
  console.log(`createPicoClaw():  ${hasFactory ? 'available' : 'MISSING'}`);
  console.log(`CMDOPClient:       ${hasClient ? 'available' : 'MISSING'}`);
  console.log(`defaultConfig:     ${JSON.stringify(pc.defaultConfig)}`);

  const ok = hasFactory && hasClient;
  console.log(ok ? 'OK' : 'FAILED');
  process.exit(ok ? 0 : 1);
}

const arg = process.argv[2];
switch (arg) {
  case '-v':
  case '--version':
  case 'version':
    version();
    break;
  case 'doctor':
    doctor();
    break;
  case undefined:
  case '-h':
  case '--help':
  case 'help':
    help();
    break;
  default:
    console.error(`picoclaw: unknown command '${arg}'. Try 'picoclaw help'.`);
    process.exit(1);
}
