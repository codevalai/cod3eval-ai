# Architecture

## Implemented

- `packages/contracts` defines request and response schemas shared by the API and browser.
- `packages/valuation-engine` calculates a replacement-cost estimate from explicit inputs.
- `apps/api` exposes `GET /api/health` and `POST /api/evaluate`.
- `apps/web` provides the local valuation workbench.

The web app proxies `/api` to the local API during development. The API does not persist requests or issue signed attestations.

## Planned, Not Implemented

Market data, global software GDP, regulator dockets, court or policy rulings, post-quantum ledgers, hardware attestations, and black-swan simulations are not part of this implementation. Add these only with a defined data source or model, threat analysis where applicable, validation, and tests. Route names in the initial product brief are design ideas, not live APIs.

## Boundaries

External request bodies are parsed with Zod before reaching the model. The browser validates both submitted input and API response shape. The estimate model is deterministic and has no model-provider, filesystem, or network dependency.