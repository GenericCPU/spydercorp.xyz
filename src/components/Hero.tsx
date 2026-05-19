import { ArrowRight } from 'lucide-react';
import { BusinessCard } from './BusinessCard';
import { site } from '../site';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">Marketing · Design · Engineering · Systems</p>

          <h1 className="hero__title">
            {site.heroTitle}
            <br />
            <span className="text-accent">No ceiling.</span>
          </h1>

          <p className="hero__lead">{site.heroLead}</p>
          <p className="hero__location">Based in {site.location}</p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn-primary">
              Start a project
              <ArrowRight size={15} strokeWidth={2} aria-hidden />
            </a>
            <a href="#work" className="btn btn-ghost">
              View work
            </a>
          </div>

          <dl className="hero__stats">
            {site.heroStats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__brand">
          <div className="hero__brand-stack">
            <p className="hero__card-label">Here&apos;s my card</p>
            <BusinessCard />
          </div>
        </div>
      </div>
    </section>
  );
}
