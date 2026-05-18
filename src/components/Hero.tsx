import { ArrowRight, Sparkles } from 'lucide-react';
import { site } from '../site';
import './Hero.css';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__badge glass">
            <Sparkles size={14} aria-hidden />
            <span>Marketing · Design · Engineering</span>
          </p>

          <h1 className="hero__title">
            <span className="text-gradient">Weave your brand</span>
            <br />
            into the city grid.
          </h1>

          <p className="hero__lead">{site.tagline}</p>

          <p className="hero__sub">
            SpiderCorp builds premium web presence for local businesses — strategy, design, and
            code in one thread. Based in {site.location}.
          </p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn-primary">
              Start a project
              <ArrowRight size={18} aria-hidden />
            </a>
            <a href="#work" className="btn btn-ghost">
              View work
            </a>
          </div>

          <ul className="hero__stats">
            <li>
              <strong>3-in-1</strong>
              <span>Brand, design & build</span>
            </li>
            <li>
              <strong>Local</strong>
              <span>Walk-in & delivery brands</span>
            </li>
            <li>
              <strong>Flexible</strong>
              <span>Project, retainer, or trade</span>
            </li>
          </ul>
        </div>

        <div className="hero__visual glass" aria-hidden>
          <div className="hero__orb" />
          <div className="hero__card hero__card--1">
            <span>Brand lift</span>
            <strong>+ discoverability</strong>
          </div>
          <div className="hero__card hero__card--2">
            <span>Ship speed</span>
            <strong>Days, not months</strong>
          </div>
          <div className="hero__card hero__card--3">
            <span>Stack</span>
            <strong>Modern · Fast · Yours</strong>
          </div>
          <svg className="hero__mini-web" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="2" fill="var(--cyan)" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const x2 = 60 + Math.cos(rad) * 48;
              const y2 = 60 + Math.sin(rad) * 48;
              return (
                <line
                  key={deg}
                  x1="60"
                  y1="60"
                  x2={x2}
                  y2={y2}
                  stroke="rgba(167,139,250,0.35)"
                  strokeWidth="0.8"
                />
              );
            })}
            <circle cx="60" cy="60" r="22" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="0.6" />
            <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
