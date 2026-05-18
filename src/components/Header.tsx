import { useEffect, useState } from 'react';
import { Menu, Moon, Sun } from 'lucide-react';
import { Logo } from './Logo';
import { useTheme } from '../theme/ThemeContext';
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
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="container header__inner">
          <a href="#" className="header__logo">
            <Logo variant="compact" />
          </a>

          <nav className="header__nav" aria-label="Primary">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__icon-btn"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
            >
              {isDark ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
            <a href="#contact" className="btn btn-primary header__cta">
              Start a project
            </a>
          </div>

          <button
            type="button"
            className="header__menu-btn"
            aria-label="Open menu"
            onClick={() => setNavOpen(true)}
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} links={links} />
    </>
  );
}
