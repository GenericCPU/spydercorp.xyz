import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { X } from 'lucide-react';
import type { NavLink } from '../nav';
import './MobileNav.css';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  activeHref: string;
}

export function MobileNav({ open, onClose, links, activeHref }: MobileNavProps) {
  return (
    <Dialog.Root
      open={open}
      lazyMount
      unmountOnExit
      onOpenChange={(details) => {
        if (!details.open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop className="mobile-nav-backdrop" />
        <Dialog.Positioner className="mobile-nav-positioner">
          <Dialog.Content className="mobile-nav-panel">
            <header className="mobile-nav__header">
              <Dialog.Title className="mobile-nav__title">Menu</Dialog.Title>
              <Dialog.CloseTrigger className="mobile-nav__close" aria-label="Close menu">
                <X size={22} strokeWidth={1.75} />
              </Dialog.CloseTrigger>
            </header>

            <nav className="mobile-nav__links" aria-label="Mobile">
              {links.map((l) => {
                const isActive = activeHref === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className={isActive ? 'is-active' : undefined}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={onClose}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>

            <div className="mobile-nav__footer">
              <a href="#contact" className="btn btn-primary mobile-nav__cta" onClick={onClose}>
                Start a project
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
