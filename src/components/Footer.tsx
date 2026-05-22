import { site } from '../site';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {site.brand} · {site.domain}
        </p>
        <p className="footer__tag">
          <span className="text-accent">corp</span> · web · engineering · systems
        </p>
      </div>
    </footer>
  );
}
