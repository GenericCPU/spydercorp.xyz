import type { ContactPayload } from '../types/contact';

export type { ContactPayload };
export type SubmitResult = { ok: true } | { ok: false; error: string };

const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

function buildMessage(projectType: string, message: string) {
  return [`Project type: ${projectType}`, '', message].join('\n');
}

async function submitViaWeb3Forms(
  accessKey: string,
  payload: ContactPayload,
): Promise<SubmitResult> {
  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        name: payload.name,
        email: payload.email,
        subject: 'Project inquiry — SpiderCorp',
        message: buildMessage(payload.projectType, payload.message),
      }),
    });

    const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;

    if (res.ok && data?.success) {
      return { ok: true };
    }

    return {
      ok: false,
      error: data?.message || `Send failed (${res.status})`,
    };
  } catch {
    return { ok: false, error: 'Network error. Check your connection or email us directly.' };
  }
}

async function submitViaApi(payload: ContactPayload): Promise<SubmitResult> {
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

/** Web3Forms from the browser (free tier); falls back to same-origin API (Resend). */
export async function submitContactForm(payload: ContactPayload): Promise<SubmitResult> {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  if (web3Key) {
    return submitViaWeb3Forms(web3Key, payload);
  }
  return submitViaApi(payload);
}
