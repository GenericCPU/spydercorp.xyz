export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  projectType: string;
};

export type ContactForwardResult = { ok: true } | { ok: false; error: string };

const EMAIL = 'brandongcryderman@gmail.com';

export async function forwardContactToFormSubmit(
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

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message: [`Project type: ${projectType}`, '', message].join('\n'),
        _subject: 'Project inquiry — spydercorp',
        _template: 'table',
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, error: text || `Send failed (${res.status})` };
    }

    return { ok: true };
  } catch {
    return { ok: false, error: 'Unable to send message. Try again or email us directly.' };
  }
}
