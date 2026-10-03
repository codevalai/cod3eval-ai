import type { EvaluationRequest, EvaluationResult } from '../../contracts/src/index.js';

const productivityByLanguage: Record<EvaluationRequest['language'], number> = {
  TypeScript: 18,
  JavaScript: 21,
  Python: 23,
  Java: 16,
  Go: 19,
  Rust: 12,
  'C#': 17,
  'C++': 11,
};

const complexityMultiplier: Record<EvaluationRequest['complexity'], number> = {
  low: 0.85,
  moderate: 1,
  high: 1.25,
  'very-high': 1.6,
};

const roundCurrency = (value: number) => Math.round(value * 100) / 100;

export function evaluateAsset(input: EvaluationRequest): EvaluationResult {
  const adjustedLinesOfCode = Math.round(input.linesOfCode * (1 - input.reusePercent / 100));
  const estimatedEffortHours =
    (adjustedLinesOfCode / productivityByLanguage[input.language]) *
    complexityMultiplier[input.complexity];
  const replacementCost = roundCurrency(estimatedEffortHours * input.hourlyRate);

  return {
    assetName: input.assetName,
    currency: 'USD',
    modelVersion: '0.1.0',
    adjustedLinesOfCode,
    estimatedEffortHours: Math.round(estimatedEffortHours * 10) / 10,
    replacementCost,
    rangeLow: roundCurrency(replacementCost * 0.75),
    rangeHigh: roundCurrency(replacementCost * 1.35),
    assumptions: [
      `${productivityByLanguage[input.language]} new lines per engineering hour for ${input.language}`,
      `${complexityMultiplier[input.complexity]}x complexity adjustment (${input.complexity})`,
      `${input.reusePercent}% of submitted lines treated as reusable`,
      `Loaded labor rate of $${input.hourlyRate.toFixed(2)} per hour`,
      'Indicative range uses a fixed -25% / +35% scenario around the point estimate',
    ],
    disclaimer:
      'An illustrative replacement-cost estimate, not an appraisal, accounting opinion, investment recommendation, or attestation.',
  };
}