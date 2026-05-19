import { createListCollection } from '@ark-ui/react/collection';
import { Field } from '@ark-ui/react/field';
import { Select } from '@ark-ui/react/select';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { submitContactForm } from '../lib/submitContact';
import { toaster } from '../lib/toaster';
import { projectTypes, site } from '../site';
import './Contact.css';

const projectCollection = createListCollection({
  items: projectTypes.map((p) => ({ label: p.label, value: p.value })),
});

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const [projectType, setProjectType] = useState<string[]>([projectTypes[0].value]);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const honeypot = String(data.get('_gotcha') ?? '');

    if (honeypot) return;

    const typeLabel =
      projectTypes.find((p) => p.value === projectType[0])?.label ?? 'General';

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
      projectType: typeLabel,
    });

    if (result.ok) {
      setStatus('idle');
      form.reset();
      setProjectType([projectTypes[0].value]);
      toaster.success({
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
            <h3 className="contact__aside-title">Reach us</h3>
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

              <Field.Root className="sc-field" required>
                <Field.Label>Name</Field.Label>
                <Field.Input name="name" autoComplete="name" required disabled={status === 'sending'} />
              </Field.Root>

              <Field.Root className="sc-field" required>
                <Field.Label>Email</Field.Label>
                <Field.Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={status === 'sending'}
                />
              </Field.Root>

              <Field.Root className="sc-field">
                <Field.Label>Project type</Field.Label>
                <Select.Root
                  collection={projectCollection}
                  value={projectType}
                  onValueChange={(e) => setProjectType(e.value)}
                  positioning={{ sameWidth: true }}
                  disabled={status === 'sending'}
                >
                  <Select.Control>
                    <Select.Trigger className="sc-select-trigger">
                      <Select.ValueText placeholder="Select type" />
                      <Select.Indicator aria-hidden>▾</Select.Indicator>
                    </Select.Trigger>
                  </Select.Control>
                  <Select.Positioner>
                    <Select.Content className="sc-select-content">
                      {projectCollection.items.map((item) => (
                        <Select.Item key={item.value} item={item} className="sc-select-item">
                          <Select.ItemText>{item.label}</Select.ItemText>
                          <Select.ItemIndicator>
                            <Check size={14} strokeWidth={2.5} aria-hidden />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Field.Root>

              <Field.Root className="sc-field" required>
                <Field.Label>Message</Field.Label>
                <Field.Textarea
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
