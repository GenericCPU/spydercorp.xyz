import type { VercelRequest, VercelResponse } from '@vercel/node';
import { forwardContactToFormSubmit, type ContactPayload } from '../lib/contactServer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = req.body as ContactPayload | undefined;
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid request body' });
  }

  const result = await forwardContactToFormSubmit(body);
  return res.status(result.ok ? 200 : 502).json(result);
}
