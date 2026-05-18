import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { navLinks, navSectionIds } from '../nav';
import { Logo } from './Logo';
import { site } from '../site';
import { useTheme } from '../theme/ThemeContext';
import './Header.css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const activeHref = useActiveSection(navSectionIds, 120);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__shell">
        <a href="#" className="header__brand" aria-label={`${site.brand} home`}>
          <Logo variant="mark" />
          <span className="header__brand-text">{site.domain}</span>
        </a>

        <div className="header__divider" aria-hidden="true" />

        <nav className="header__nav" aria-label="Primary">
          {navLinks.map((l) => {
            const isActive = activeHref === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                className={`header__nav-link${isActive ? ' is-active' : ''}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="header__utilities">
          <button
            type="button"
            className="header__icon-btn"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={toggleTheme}
          >
            {isDark ? <Moon size={18} strokeWidth={1.75} /> : <Sun size={18} strokeWidth={1.75} />}
          </button>
          <a href="#contact" className="btn btn-primary header__cta">
            Start a project
          </a>
        </div>
      </div>
    </header>
  );
}
