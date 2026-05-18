import type { ContactPayload } from '../types/contact';

export type { ContactPayload };
export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Same-origin API route proxies to FormSubmit (avoids browser CORS). */
export async function submitContactForm(payload: ContactPayload): Promise<SubmitResult> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as SubmitResult | null;

    if (res.ok && data?.ok) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data && !data.ok ? data.error : `Send failed (${res.status})`,
    };
  } catch {
    return { ok: false, error: 'Network error. Check your connection or email us directly.' };
  }
}
