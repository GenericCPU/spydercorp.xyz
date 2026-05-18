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
            Premium web &amp; custom systems.
            <br />
            <span className="text-accent">No ceiling.</span>
          </h1>

          <p className="hero__lead">{site.tagline}</p>

          <p className="hero__sub">
            Storefronts, landing pages, admin panels, inventory, ordering, and support tooling —
            one partner from brand to backend. Based in {site.location}.
          </p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn-primary">
              Start a project
              <ArrowRight size={17} strokeWidth={2} aria-hidden />
            </a>
            <a href="#work" className="btn btn-ghost">
              View work
            </a>
          </div>

          <dl className="hero__stats">
            <div>
              <dt>Front of house</dt>
              <dd>Sites · shops · brand</dd>
            </div>
            <div>
              <dt>Back of house</dt>
              <dd>Admin · inventory · orders</dd>
            </div>
            <div>
              <dt>Engagement</dt>
              <dd>Flexible pay · pro bono for local small businesses</dd>
            </div>
          </dl>
        </div>

        <div className="hero__brand">
          <p className="hero__card-label">Here&apos;s my card</p>
          <BusinessCard />
        </div>
      </div>
    </section>
  );
}
