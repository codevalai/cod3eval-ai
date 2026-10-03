import express from 'express';
import { EvaluationRequestSchema } from '../../../packages/contracts/src/index.js';
import { evaluateAsset } from '../../../packages/valuation-engine/src/index.js';

export function createApp() {
  const app = express();
  app.use(express.json({ limit: '32kb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'cod3eval-api', version: '0.1.0' });
  });

  app.post('/api/evaluate', (request, response) => {
    const parsed = EvaluationRequestSchema.safeParse(request.body);
    if (!parsed.success) {
      response.status(400).json({
        error: 'Invalid valuation request',
        issues: parsed.error.issues.map(({ path, message }) => ({ path, message })),
      });
      return;
    }

    response.json(evaluateAsset(parsed.data));
  });

  return app;
}