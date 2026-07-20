# SDKWork Xiangqi
repository-kind: application

SDKWork Xiangqi (中国象棋) application root. Provides match, room, and leaderboard capabilities aligned with `../sdkwork-specs`.

## Active layout

| Path | Purpose |
| --- | --- |
| `apis/` | HTTP API contracts (open/app/backend) |
| `apps/sdkwork-xiangqi-pc/` | PC browser/desktop React application root |
| `crates/` | Rust services, repositories, API server |
| `database/` | `sdkwork-database` lifecycle assets (`moduleId=XIANGQI`, prefix `xq_`) |
| `sdks/` | SDK families and route manifests |
| `scripts/`, `tools/` | Verification, generation, and command dispatch |
| `deployments/` | Deployment descriptors and packaging handoff |
| `configs/` | Safe runtime config templates |

## Framework integration

- **HTTP**: `sdkwork-web-framework` via `crates/sdkwork-api-xiangqi-standalone-gateway`
- **Database**: `sdkwork-database` via `crates/sdkwork-xiangqi-database-host` and `database/`
- **Utils**: `@sdkwork/utils` (TypeScript), `sdkwork-utils-rust` (Rust)
- **Discovery**: not integrated (no RPC services yet; add when split-service RPC is required)

## Commands

```bash
pnpm install
pnpm dev
pnpm verify
pnpm api:materialize
pnpm db:validate
```

See `AGENTS.md` and `../sdkwork-specs/README.md` for standards.

## Documentation Canon

- [docs/README.md](docs/README.md)
- [docs/product/prd/PRD.md](docs/product/prd/PRD.md)
- [docs/architecture/tech/TECH_ARCHITECTURE.md](docs/architecture/tech/TECH_ARCHITECTURE.md)

## Application Roots

- [apps directory index](apps/README.md)
