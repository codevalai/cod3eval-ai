import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app.js';

const app = createApp();

describe('valuation API', () => {
  it('reports service health', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('returns an estimate for a valid request', async () => {
    const response = await request(app).post('/api/evaluate').send({
      assetName: 'Billing service',
      linesOfCode: 10_000,
      language: 'TypeScript',
      complexity: 'moderate',
      reusePercent: 20,
      hourlyRate: 125,
    });

    expect(response.status).toBe(200);
    expect(response.body.replacementCost).toBe(55_555.56);
    expect(response.body.disclaimer).toContain('illustrative');
  });

  it('rejects malformed or out-of-range inputs', async () => {
    const response = await request(app).post('/api/evaluate').send({
      assetName: 'x',
      linesOfCode: -1,
      language: 'Unknown',
      complexity: 'moderate',
      reusePercent: 20,
      hourlyRate: 125,
    });

    expect(response.status).toBe(400);
    expect(response.body.issues.length).toBeGreaterThan(0);
  });
});