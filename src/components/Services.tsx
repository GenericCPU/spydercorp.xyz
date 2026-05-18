import { Tabs } from '@ark-ui/react/tabs';
import { Code2, Megaphone, Palette, Server } from 'lucide-react';
import { services } from '../site';
import './Services.css';

const icons = {
  brand: Megaphone,
  design: Palette,
  engineering: Code2,
  systems: Server,
} as const;

function ServiceCard({
  id,
  index,
}: {
  id: (typeof services)[number]['id'];
  index: number;
}) {
  const s = services.find((x) => x.id === id)!;
  const Icon = icons[s.id];

  return (
    <article className={`services__card panel services__card--${index}`}>
      <div className="services__icon">
        <Icon size={22} strokeWidth={1.75} aria-hidden />
      </div>
      <h3>{s.title}</h3>
      <p>{s.description}</p>
      <ul>
        {s.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <p className="section-label">Services</p>
        <h2 className="section-title">One studio. Full stack.</h2>
        <p className="section-lead">
          Marketing, design, engineering, and custom systems — not siloed vendors. From landing pages
          to admin panels, inventory, ordering, and support: the sky&apos;s the limit.
        </p>

        <div className="services__grid" role="list">
          {services.map((s, i) => (
            <ServiceCard key={s.id} id={s.id} index={i} />
          ))}
        </div>

        <Tabs.Root className="services__tabs" defaultValue={services[0].id}>
          <Tabs.List className="sc-tabs-list" aria-label="Services">
            {services.map((s) => (
              <Tabs.Trigger key={s.id} value={s.id} className="sc-tabs-trigger">
                {s.title.split(' ')[0]}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {services.map((s, i) => (
            <Tabs.Content key={s.id} value={s.id}>
              <ServiceCard id={s.id} index={i} />
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
