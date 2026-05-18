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
        <p className="footer__tag">Marketing · Web design · Full-stack engineering</p>
      </div>
    </footer>
  );
}
