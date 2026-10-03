import express from 'express';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from './app.js';

const port = Number(process.env.PORT ?? 3001);
const app = createApp();

if (process.env.NODE_ENV === 'production') {
  const distPath = resolve(fileURLToPath(new URL('../../../dist', import.meta.url)));
  app.use(express.static(distPath));
  app.get(/^(?!\/api(?:\/|$)).*/, (_request, response) => {
    response.sendFile(resolve(distPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Cod3Eval app listening on http://localhost:${port}`);
});