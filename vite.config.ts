import react from '@vitejs/plugin-react';
import type { IncomingMessage } from 'node:http';
import { defineConfig, type Plugin } from 'vite';
import { forwardContactToFormSubmit } from './lib/contactServer';

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : null);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function contactApiDev(): Plugin {
  return {
    name: 'contact-api-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url !== '/api/contact') return next();

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
          return;
        }

        try {
          const body = await readJsonBody(req);
          const result = await forwardContactToFormSubmit(body as Parameters<typeof forwardContactToFormSubmit>[0]);
          res.statusCode = result.ok ? 200 : 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result));
        } catch {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Invalid request body' }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), contactApiDev()],
});
