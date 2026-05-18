import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { site } from '../site';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <Logo variant="png" className="hero__logo" />

        <p className="hero__eyebrow">Marketing · Design · Engineering</p>

        <h1 className="hero__title">
          Premium web presence.
          <br />
          <span className="text-accent">Built raw.</span> Shipped fast.
        </h1>

        <p className="hero__lead">{site.tagline}</p>

        <p className="hero__sub">
          Strategy, interface, and code in one thread — for local businesses and product teams.
          Based in {site.location}.
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
            <dt>Scope</dt>
            <dd>Brand · UI · Full stack</dd>
          </div>
          <div>
            <dt>Focus</dt>
            <dd>Conversion & clarity</dd>
          </div>
          <div>
            <dt>Terms</dt>
            <dd>Project · retainer · trade</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
