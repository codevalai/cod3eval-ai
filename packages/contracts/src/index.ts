import { z } from 'zod';

export const languages = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C#',
  'C++',
] as const;

export const complexities = ['low', 'moderate', 'high', 'very-high'] as const;

export const EvaluationRequestSchema = z.object({
  assetName: z.string().trim().min(2).max(80),
  linesOfCode: z.number().int().min(1).max(1_000_000),
  language: z.enum(languages),
  complexity: z.enum(complexities),
  reusePercent: z.number().min(0).max(95),
  hourlyRate: z.number().min(25).max(1_000),
});

export type EvaluationRequest = z.infer<typeof EvaluationRequestSchema>;

export const EvaluationResultSchema = z.object({
  assetName: z.string(),
  currency: z.literal('USD'),
  modelVersion: z.literal('0.1.0'),
  adjustedLinesOfCode: z.number().nonnegative(),
  estimatedEffortHours: z.number().nonnegative(),
  replacementCost: z.number().nonnegative(),
  rangeLow: z.number().nonnegative(),
  rangeHigh: z.number().nonnegative(),
  assumptions: z.array(z.string()),
  disclaimer: z.string(),
});

export type EvaluationResult = z.infer<typeof EvaluationResultSchema>;