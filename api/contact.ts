import type { VercelRequest, VercelResponse } from '@vercel/node';
import { forwardContact, type ContactPayload } from './lib/contactServer';

function parseBody(req: VercelRequest): ContactPayload | null {
  let body: unknown = req.body;

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return null;
    }
  }

  if (!body || typeof body !== 'object') {
    return null;
  }

  const record = body as Record<string, unknown>;
  return {
    name: String(record.name ?? ''),
    email: String(record.email ?? ''),
    message: String(record.message ?? ''),
    projectType: String(record.projectType ?? 'General'),
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = parseBody(req);
  if (!body) {
    return res.status(400).json({ ok: false, error: 'Invalid request body' });
  }

  const result = await forwardContact(body);
  return res.status(result.ok ? 200 : 502).json(result);
}
