import { process } from '../site';
import './Process.css';

export function Process() {
  return (
    <section id="process" className="section process">
      <div className="container">
        <header className="section-header">
          <p className="section-label">Process</p>
          <h2 className="section-title">From first call to live.</h2>
          <p className="section-lead">
            Lightweight enough for a local shop. Rigorous enough for a SaaS launch.
          </p>
        </header>

        <ol className="process__steps">
          {process.map((step) => (
            <li key={step.step} className="process__step panel">
              <span className="process__num">{step.step}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
