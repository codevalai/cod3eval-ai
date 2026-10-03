import { describe, expect, it } from 'vitest';
import { evaluateAsset } from './index.js';

const request = {
  assetName: 'Billing service',
  linesOfCode: 10_000,
  language: 'TypeScript' as const,
  complexity: 'moderate' as const,
  reusePercent: 20,
  hourlyRate: 125,
};

describe('evaluateAsset', () => {
  it('calculates a transparent replacement-cost estimate', () => {
    const result = evaluateAsset(request);

    expect(result.adjustedLinesOfCode).toBe(8_000);
    expect(result.estimatedEffortHours).toBe(444.4);
    expect(result.replacementCost).toBe(55_555.56);
    expect(result.rangeLow).toBe(41_666.67);
    expect(result.rangeHigh).toBe(75_000.01);
  });

  it('reduces estimated cost when the reuse assumption increases', () => {
    const withMoreReuse = evaluateAsset({ ...request, reusePercent: 40 });

    expect(withMoreReuse.replacementCost).toBeLessThan(evaluateAsset(request).replacementCost);
  });
});