import { Field, Select, useToast } from '@aeon-ui/react';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { submitContactForm } from '../lib/submitContact';
import { projectTypes, site } from '../site';
import './Contact.css';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const { publish } = useToast();
  const [projectType, setProjectType] = useState<string>(projectTypes[0].value);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const projectLabel =
    projectTypes.find((p) => p.value === projectType)?.label ?? 'General';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const honeypot = String(data.get('_gotcha') ?? '');

    if (honeypot) return;

    if (!name || !email || !message) {
      setStatus('error');
      setErrorMessage('Name, email, and message are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const result = await submitContactForm({
      name,
      email,
      message,
      projectType: projectLabel,
    });

    if (result.ok) {
      setStatus('idle');
      form.reset();
      setProjectType(projectTypes[0].value);
      publish({
        title: 'Message sent',
        description: "We'll get back to you at the email you provided.",
      });
      return;
    }

    setStatus('error');
    setErrorMessage(result.error);
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <header className="section-header">
          <p className="section-label">Contact</p>
          <h2 className="section-title">Start a thread.</h2>
          <p className="section-lead">{site.contactSectionLead}</p>
        </header>

        <div className="contact__panel panel">
          <aside className="contact__aside">
            <h3 className="contact__aside-title">Reach out</h3>
            <ul className="contact__meta">
              <li>
                <Mail size={18} aria-hidden />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Phone size={18} aria-hidden />
                <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
              </li>
              <li>
                <MapPin size={18} aria-hidden />
                <span>{site.location}</span>
              </li>
            </ul>
          </aside>

          <div className="contact__form-wrap">
            {status === 'error' && (
              <p className="contact__alert contact__alert--error" role="alert">
                {errorMessage}{' '}
                <a href={`mailto:${site.email}`}>Email {site.email}</a> instead.
              </p>
            )}

            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="_gotcha"
                className="contact__honeypot"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
              />

              <Field.Root className="sc-field">
                <Field.Label htmlFor="contact-name">Name</Field.Label>
                <Field.Control
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  disabled={status === 'sending'}
                />
              </Field.Root>

              <Field.Root className="sc-field">
                <Field.Label htmlFor="contact-email">Email</Field.Label>
                <Field.Control
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={status === 'sending'}
                />
              </Field.Root>

              <Field.Root className="sc-field">
                <Field.Label htmlFor="contact-project">Project type</Field.Label>
                <Select.Root
                  value={projectType}
                  onValueChange={setProjectType}
                  disabled={status === 'sending'}
                >
                  <Select.Trigger className="sc-select-trigger" id="contact-project">
                    {projectLabel}
                    <span aria-hidden> ▾</span>
                  </Select.Trigger>
                  <Select.Content className="sc-select-content">
                    {projectTypes.map((item) => (
                      <Select.Item key={item.value} value={item.value} className="sc-select-item">
                        {item.label}
                        {item.value === projectType ? (
                          <Check size={14} strokeWidth={2.5} aria-hidden />
                        ) : null}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Field.Root>

              <Field.Root className="sc-field">
                <Field.Label htmlFor="contact-message">Message</Field.Label>
                <Field.Textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your business…"
                  disabled={status === 'sending'}
                />
              </Field.Root>

              <button
                type="submit"
                className="btn btn-primary contact__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
