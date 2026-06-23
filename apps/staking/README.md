# XPoint Staking Portal

XPoint Staking Portal is a [Next.js](https://nextjs.org/) app for registering XPoint nodes, staking XPNT, claiming rewards, and managing node exits.

## Getting Started

Follow the generic instructions in the root [README.md](../../README.md#getting-started) to install dependencies and run workspace commands.

## Development

Running the app requires several environment variables. See [.env.local.template](.env.local.template) for the local variable list.

For local end-to-end work, run the XPoint UAT stack from `deep-devops`:

```powershell
docker compose --env-file ..\deep-devops\.env.uat -f ..\deep-devops\docker-compose.uat.yml up -d --build --wait
```

The portal talks to:

- XPoint staking backend: `NEXT_PUBLIC_BACKEND_API_URL`
- XPoint network API/RPC proxy: `NEXT_PUBLIC_NETWORK_API_URL`
- browser-safe Arbitrum RPC proxy: `NEXT_PUBLIC_RPC_URL_ARB=/api/network/rpc/arbitrum`

Do not put private RPC provider URLs in `NEXT_PUBLIC_*` variables. Private Arbitrum RPC providers belong behind the staking backend proxy.

## Operator docs

Node setup and staking flow are documented in the XPoint docs portal:

- [Production node setup](https://docs.xpoint.network/xpoint-nodes/setup-production-node)
- [Register and stake a node](https://docs.xpoint.network/xpoint-nodes/register-node)
- [Staking, rewards, exits, and liquidation](https://docs.xpoint.network/xpoint-token/staking-and-rewards)
