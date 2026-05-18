import { Tabs } from '@ark-ui/react/tabs';
import { Check, Code2, HandHeart, HandCoins, Megaphone, Palette, Server, UserRound } from 'lucide-react';
import { services, studioCommitments } from '../site';
import './Services.css';

const icons = {
  brand: Megaphone,
  design: Palette,
  engineering: Code2,
  systems: Server,
} as const;

const commitmentIcons = {
  personal: UserRound,
  payment: HandCoins,
  probono: HandHeart,
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
      <header className="services__card-head">
        <span className="services__icon" aria-hidden>
          <Icon size={20} strokeWidth={2.25} />
        </span>
        <h3>{s.title}</h3>
      </header>
      <p>{s.description}</p>
      <ul>
        {s.highlights.map((h) => (
          <li key={h}>
            <Check size={14} strokeWidth={2.5} aria-hidden />
            {h}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <header className="section-header">
          <p className="section-label">Services</p>
          <h2 className="section-title">One studio. Full stack.</h2>
          <p className="section-lead">
            Marketing, design, engineering, and custom systems — not siloed vendors. We work with
            you one-on-one, with payment that fits your business, including pro bono support for
            qualifying local shops.
          </p>
        </header>

        <div className="services__commitments panel" role="list">
          {studioCommitments.map((c) => {
            const Icon = commitmentIcons[c.id];
            return (
              <div key={c.id} className="services__commitment" role="listitem">
                <span className="services__commitment-icon" aria-hidden>
                  <Icon size={18} strokeWidth={2.25} />
                </span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="services__grid-label">What we build</p>

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
