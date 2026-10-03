# API

The development API listens on port `3001`; the Vite server proxies `/api` requests to it.

## `GET /api/health`

Returns service status and the API version.

## `POST /api/evaluate`

Accepts JSON with `assetName`, `linesOfCode`, `language`, `complexity`, `reusePercent`, and `hourlyRate`. The Zod contract in `packages/contracts` is authoritative. Invalid input returns `400` with an error and field issues. A successful response includes the point estimate, scenario range, effort, adjusted size, assumptions, model version, and disclaimer.

No other endpoints are currently implemented. Requests are processed in memory and are not persisted.