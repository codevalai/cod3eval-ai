# Valuation Method

## Replacement-Cost Baseline

Version `0.1.0` estimates the engineering effort to recreate a code asset. It is a transparent heuristic, not a standard-compliant appraisal or a claim of market value.

```text
adjusted LOC = submitted LOC × (1 − reusable-code percentage)
effort hours = adjusted LOC ÷ language productivity × complexity multiplier
point estimate = effort hours × loaded hourly rate
scenario low = point estimate × 0.75
scenario high = point estimate × 1.35
```

The language productivity baselines are TypeScript 18, JavaScript 21, Python 23, Java 16, Go 19, Rust 12, C# 17, and C++ 11 new lines per engineering hour. Complexity multipliers are 0.85 (low), 1.0 (moderate), 1.25 (high), and 1.6 (very high). These are configurable starting assumptions, not measured industry benchmarks.

## Limitations

The model does not inspect source code, measure quality, estimate revenue, account for team-specific productivity, determine legal ownership, or model uncertainty statistically. Its fixed range is a sensitivity band, not a confidence interval. Validate calibration against documented project data before using results for business decisions. Results are not investment, tax, legal, or accounting advice.