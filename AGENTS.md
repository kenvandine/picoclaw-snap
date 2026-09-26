# Snap Agent Responsibilities

This repository is now maintained by [automated-ken](https://github.com/kenvandine/automated-ken), a self-hosted agentic snap-maintenance dashboard.

## Automated Responsibilities

- **Version Detection**: Automatically polls upstream for new releases
- **Version Bump PRs**: Opens PRs to bump the pinned version when new upstream releases are detected
- **CI Monitoring**: Monitors build workflows and asks Copilot cloud agent to fix failing builds (with follow-up PRs)
- **YARF Testing**: Runs YARF (Yet Another Release Framework) tests
- **Channel Promotion**: Handles promotion from edge -> candidate -> stable

## Important Notes

- **Do not hand-edit the pinned version** in snap/snapcraft.yaml — this is now fully automated
- The removed workflow's job (upstream release polling) is now automated-ken's responsibility
- All build/publish workflows now follow the canonical pattern defined in automated-ken

## Maintainer Guidelines

- No manual version bumps or workflow edits should be made
- Any CI issues should be reported to automated-ken for automated resolution
- Channel promotion is now fully automated and follows a defined process
