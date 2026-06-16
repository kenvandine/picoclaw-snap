# picoclaw snap

Snap packaging for [PicoClaw](https://github.com/sipeed/picoclaw) by Sipeed — a tiny, fast, local-first personal AI assistant (a single static Go binary that runs in under 10 MB of RAM).

## Building

```
snapcraft
```

Snapcraft fetches the latest PicoClaw release binary for the target architecture from GitHub. No build toolchain is required.

## Installing

```
sudo snap install --classic picoclaw_<version>_amd64.snap --dangerous
```

## Usage

```
picoclaw onboard            # first-run setup wizard
picoclaw agent -m "..."     # one-shot chat with the agent
picoclaw                    # interactive CLI
picoclaw.lemonade           # pick a local Lemonade model (interactive TUI)
picoclaw.inference-snap     # pick a Canonical inference snap (interactive TUI)
```

The background gateway service (chat-platform integrations) is installed and enabled as a systemd user unit the first time any `picoclaw` command is run:

```
systemctl --user status picoclaw
systemctl --user stop picoclaw
```

### Local AI with Lemonade

`picoclaw.lemonade` detects a running [lemonade-server](https://lemonade-server.ai)
(`http://127.0.0.1:13305`), lists its loaded chat models, and lets you choose one
as PicoClaw's default. It configures the model through PicoClaw's own
`picoclaw model add` command (an OpenAI-compatible endpoint) and restarts the
gateway. Re-run it any time to switch models. Because PicoClaw is a dependency-free
static binary, this picker is a pure POSIX-sh + curl TUI (rather than the Node TUI
used by Node-based claw snaps).

### Local AI with Canonical inference snaps

`picoclaw.inference-snap` detects installed [Canonical inference snaps](https://snapcraft.io/search?q=inference)
such as `gemma4`, `gemma3`, `deepseek-r1`, `nemotron-3-nano`, or `qwen-vl`, probes
their OpenAI-compatible API, and lets you choose one as PicoClaw's default model.
It registers the endpoint via `picoclaw model add` and restarts the gateway so the
change takes effect immediately. Re-run it any time to switch models.

```
sudo snap install gemma4
picoclaw.inference-snap
```

## Design notes

**GitHub release binary** — PicoClaw ships as a pre-built static Go binary from GitHub releases (`picoclaw_Linux_<arch>.tar.gz`). The `nil` plugin is used with a custom `override-pull` that downloads and extracts the correct binary for the target architecture; the snap version is adopted from the upstream release tag.

**Classic confinement** — PicoClaw performs agentic tasks (file operations, code execution, scheduled jobs) that require broad system access.

**Gateway daemon** — `picoclaw gateway` runs the chat-integration server as a systemd user unit (`picoclaw.daemon`).

## Links

- Upstream project: <https://github.com/sipeed/picoclaw> (https://picoclaw.io)
- Snap packaging: <https://github.com/kenvandine/picoclaw-snap>
- Report a snap issue: <https://github.com/kenvandine/picoclaw-snap/issues>

## License

PicoClaw is licensed under **MIT**. This snap packaging lives in [kenvandine/picoclaw-snap](https://github.com/kenvandine/picoclaw-snap).
