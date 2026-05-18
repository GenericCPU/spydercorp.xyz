import { Resend } from 'resend';

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  projectType: string;
};

export type ContactForwardResult = { ok: true } | { ok: false; error: string };

const EMAIL = 'brandongcryderman@gmail.com';

function buildMessage(projectType: string, message: string) {
  return [`Project type: ${projectType}`, '', message].join('\n');
}

async function forwardViaResend(
  name: string,
  email: string,
  projectType: string,
  message: string,
): Promise<ContactForwardResult | null> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;

  const from = process.env.RESEND_FROM?.trim() || 'SpyderCorp <onboarding@resend.dev>';
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [EMAIL],
    replyTo: email,
    subject: `Project inquiry — ${projectType}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${buildMessage(projectType, message)}`,
  });

  if (error) {
    return { ok: false, error: error.message };
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

  try {
    const resendResult = await forwardViaResend(name, email, projectType, message);
    if (resendResult) return resendResult;
  } catch {
    return {
      ok: false,
      error: 'Unable to send message. Try again or email us directly.',
    };
  }

  return {
    ok: false,
    error:
      'Contact form is not configured on the server. Email or call us using the details on the left.',
  };
}
