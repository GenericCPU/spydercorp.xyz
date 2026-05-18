import { site } from '../site';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  projectType: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

/** Delivers to site.email via FormSubmit (no backend required). */
export async function submitContactForm(payload: ContactPayload): Promise<SubmitResult> {
  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: [
          `Project type: ${payload.projectType}`,
          '',
          payload.message,
        ].join('\n'),
        _subject: `Project inquiry — ${site.brand}`,
        _template: 'table',
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, error: text || `Send failed (${res.status})` };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'Network error. Check your connection or email us directly.' };
  }
}
