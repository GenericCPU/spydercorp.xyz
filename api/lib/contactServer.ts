export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  projectType: string;
};

export type ContactForwardResult = { ok: true } | { ok: false; error: string };

const EMAIL = 'brandongcryderman@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`;
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

function buildMessage(projectType: string, message: string) {
  return [`Project type: ${projectType}`, '', message].join('\n');
}

async function forwardViaWeb3Forms(
  accessKey: string,
  name: string,
  email: string,
  projectType: string,
  message: string,
): Promise<ContactForwardResult> {
  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      subject: 'Project inquiry — SpyderCorp',
      message: buildMessage(projectType, message),
    }),
    signal: AbortSignal.timeout(12_000),
  });

  const data = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null;

  if (res.ok && data?.success) {
    return { ok: true };
  }

  return { ok: false, error: data?.message || `Send failed (${res.status})` };
}

async function forwardViaFormSubmit(
  name: string,
  email: string,
  projectType: string,
  message: string,
): Promise<ContactForwardResult> {
  const res = await fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      message: buildMessage(projectType, message),
      _subject: 'Project inquiry — SpyderCorp',
      _template: 'table',
      _captcha: 'false',
    }),
    signal: AbortSignal.timeout(12_000),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    let detail = text;
    try {
      const parsed = JSON.parse(text) as { title?: string };
      if (parsed.title) detail = parsed.title;
    } catch {
      /* keep raw text */
    }
    return { ok: false, error: detail || `Send failed (${res.status})` };
  }

  return { ok: true };
}

export async function forwardContact(
  payload: ContactPayload,
): Promise<ContactForwardResult> {
  const name = payload.name?.trim() ?? '';
  const email = payload.email?.trim() ?? '';
  const message = payload.message?.trim() ?? '';
  const projectType = payload.projectType?.trim() ?? 'General';

  if (!name || !email || !message) {
    return { ok: false, error: 'Name, email, and message are required.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (web3Key) {
    return forwardViaWeb3Forms(web3Key, name, email, projectType, message);
  }

  try {
    return await forwardViaFormSubmit(name, email, projectType, message);
  } catch {
    return {
      ok: false,
      error: 'Unable to send message. Try again or email us directly.',
    };
  }
}
