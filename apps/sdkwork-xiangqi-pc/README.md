# SDKWork Xiangqi PC

PC browser application root for the SDKWork Xiangqi platform.

## Structure

- `packages/sdkwork-xiangqi-pc-core` �?shared runtime (stores, SDK wiring)
- `packages/sdkwork-xiangqi-pc-commons` �?shared UI components and hooks
- `packages/sdkwork-xiangqi-pc-<capability>` �?user-facing capability modules

Package names follow `APP_PC_ARCHITECTURE_SPEC.md`: `sdkwork-xiangqi-pc-*` for app/user modules.

## Run locally

From the repository root:

```bash
pnpm dev
```

From this directory:

```bash
pnpm install
pnpm dev
```

The dev server listens on port 3000.

## Standards

- Architecture: `../../../sdkwork-specs/APP_PC_ARCHITECTURE_SPEC.md`
- UI: `../../../sdkwork-specs/APP_PC_REACT_UI_SPEC.md`
- Manifest: `sdkwork.app.config.json`
