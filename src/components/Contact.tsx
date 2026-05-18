import { createListCollection } from '@ark-ui/react/collection';
import { Field } from '@ark-ui/react/field';
import { Select } from '@ark-ui/react/select';
import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { projectTypes, site } from '../site';
import './Contact.css';

const projectCollection = createListCollection({
  items: projectTypes.map((p) => ({ label: p.label, value: p.value })),
});

export function Contact() {
  const [projectType, setProjectType] = useState<string[]>([projectTypes[0].value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const type =
      projectTypes.find((p) => p.value === projectType[0])?.label ?? 'General';

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`,
    );
    const subject = encodeURIComponent(`Project inquiry — ${site.brand}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="contact__panel glass">
          <div className="contact__copy">
            <p className="section-label">Contact</p>
            <h2 className="section-title">Spin something together.</h2>
            <p className="section-lead contact__lead">
              New builds, redesigns, and local partnerships welcome. Flexible on budget — project
              rate, retainer, donation, or trade.
            </p>

            <ul className="contact__meta">
              <li>
                <Mail size={18} aria-hidden />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <MapPin size={18} aria-hidden />
                <span>{site.location}</span>
              </li>
            </ul>
          </div>

          <form className="contact__form" onSubmit={handleSubmit}>
            <header className="contact__form-header">
              <span className="contact__form-icon" aria-hidden>
                <Send size={20} strokeWidth={1.75} />
              </span>
              <h3>Send a message</h3>
            </header>

            <Field.Root className="sc-field" required>
              <Field.Label>Name</Field.Label>
              <Field.Input name="name" autoComplete="name" required />
            </Field.Root>

            <Field.Root className="sc-field" required>
              <Field.Label>Email</Field.Label>
              <Field.Input name="email" type="email" autoComplete="email" required />
            </Field.Root>

            <Field.Root className="sc-field">
              <Field.Label>Project type</Field.Label>
              <Select.Root
                collection={projectCollection}
                value={projectType}
                onValueChange={(e) => setProjectType(e.value)}
                positioning={{ sameWidth: true }}
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
                        <Select.ItemIndicator>✓</Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
              <Field.HelperText>Helps us reply with a realistic timeline.</Field.HelperText>
            </Field.Root>

            <Field.Root className="sc-field" required>
              <Field.Label>Message</Field.Label>
              <Field.Textarea name="message" rows={5} required placeholder="Tell us about your business…" />
            </Field.Root>

            <button type="submit" className="btn btn-primary contact__submit">
              Send message
            </button>

            <p className="contact__form-note">Opens your email app with a draft — no account required.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
