# XPoint Staking Portal agent rules

The workspace rules in `../AGENTS.md` apply. This file contains only portal-specific deltas.

## Owns

- The staking web application, wallet connection and user-facing staking/reward flows.
- TypeScript API/contract bindings and reusable packages consumed by the app.
- Portal accessibility, error states, telemetry policy and frontend tests.

Economic/ABI semantics belong in `xpoint-staking-contracts`; projections belong in
`xpoint-staking-backend`; deployment/runtime config belongs in `deep-devops`.

## Repository rules

- Build Deep/XPoint behavior only. Existing `@session/*` names are removal debt, not supported
  aliases or a reason to add compatibility branches.
- Never hardcode private RPC credentials, wallet secrets, production addresses or chain state.
  Consume validated deployment manifests/configuration.
- Wallet and transaction UI must show chain, contract, amount, fee and pending/failure state before
  claiming success; do not infer confirmation from submission alone.
- Keep logging free of wallet-sensitive payloads and disable nonessential telemetry by default.
- Maintain keyboard navigation, accessible names and responsive layouts for changed flows.
- Coordinate ABI/API changes with contracts/backend and update public staking documentation.

## Verify

```powershell
corepack pnpm install --frozen-lockfile
corepack pnpm check-types
corepack pnpm lint
corepack pnpm test:ci
corepack pnpm build:ci
```
