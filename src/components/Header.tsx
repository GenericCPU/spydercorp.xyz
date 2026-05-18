import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { site } from '../site';
import { MobileNav, type NavLink } from './MobileNav';
import './Header.css';

const links: NavLink[] = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <a href="#" className="header__logo">
            <span className="header__mark" aria-hidden />
            <span>
              <strong>{site.brand}</strong>
              <small>{site.domain}</small>
            </span>
          </a>

          <nav className="header__nav" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="btn btn-primary header__cta">
            Start a project
          </a>

          <button
            type="button"
            className="header__menu-btn"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} links={links} />
    </>
  );
}
