# Cod3Eval.ai

Cod3Eval.ai is a reference implementation for software replacement-cost estimation. The current vertical slice includes a typed valuation contract, deterministic estimate model, local API, and browser workbench. Broader institutional, market, and governance systems remain roadmap ideas unless explicitly described as implemented below.

## Direction

Build a developer-friendly valuation system with auditable inputs, explicit methodology, and typed interfaces. The workbench is an unsigned local estimate tool, not an attestation authority. Names such as G-GDP-1, G-SAX, QRSL-1, GRI-Ultra, ARC-Prime, and PBSE are project terminology; they do not imply regulatory recognition, production readiness, or independently validated results.

## Proposed Repository Layout

```text
apps/
	web/                      # Valuation and attestation console
	api/                      # HTTP API and external-input validation
packages/
	valuation-engine/         # Replacement cost, adjustments, and scenarios
	enterprise-core/          # Shared domain primitives and policy interfaces
	regulator-interface/      # Docket formats and jurisdictional exports
	sovereign-ledger/         # Ledger data model and verification interfaces
	shared-types/             # API contracts and runtime schemas
benchmarks/                 # Reproducible sample assets and test fixtures
attestations/               # Generated, clearly labeled example outputs
docs/
	architecture.md           # System boundaries and implementation status
	valuation.md               # Methods, assumptions, and limitations
	regulator.md               # Export formats and jurisdictional caveats
	sovereign-ledger.md        # Ledger design and cryptographic choices
```

The valuation packages and web/API applications listed above are implemented. Regulator, market, and ledger packages remain planned. Add a module when its scope, inputs, outputs, and verification strategy are defined; avoid placeholder claims of completed integrations.

## Proposed API Surface

Implemented routes:

| Method | Route | Intended purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Return local API health and version |
| `POST` | `/api/evaluate` | Validate inputs and calculate replacement cost |

All other routes in the initial product direction remain unimplemented. Request and response boundaries use runtime schemas. The estimate documents its assumptions and limitations; it does not represent observed global economic data.

## Engineering Principles

- Keep valuation assumptions inspectable and results reproducible.
- Distinguish estimates, simulations, test fixtures, and independently verified facts.
- Treat cryptographic algorithms, hardware attestations, and legal or regulatory status as claims requiring evidence and explicit threat models.
- Publish benchmark inputs and expected outputs so changes can be reviewed.
- Add type checking, linting, and tests with the initial application/tooling setup; this repository does not yet define those commands.

## Current Status

The valuation workbench and API are an early functional slice. No economic totals, treaty recognition, survival probabilities, compliance status, or security guarantees are asserted by this repository. The figures and capabilities in future examples must be labeled as illustrative unless supported by reproducible methods and evidence.

## Development

Run `npm install` followed by `npm run dev` to start the API and web console. Use `npm test`, `npm run typecheck`, and `npm run build` for the project checks. See [docs/architecture.md](docs/architecture.md), [docs/valuation.md](docs/valuation.md), and [docs/api.md](docs/api.md) for implementation details and limitations.
