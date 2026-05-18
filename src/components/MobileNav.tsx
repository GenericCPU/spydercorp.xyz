import { Dialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { X } from 'lucide-react';
import './MobileNav.css';

export type NavLink = { href: string; label: string };

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileNav({ open, onClose, links }: MobileNavProps) {
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
        <Dialog.Backdrop className="sc-dialog-backdrop" />
        <Dialog.Positioner className="sc-dialog-positioner">
          <Dialog.Content className="sc-dialog-panel mobile-nav">
            <header className="mobile-nav__header">
              <Dialog.Title className="mobile-nav__title">Menu</Dialog.Title>
              <Dialog.CloseTrigger className="mobile-nav__close" aria-label="Close menu">
                <X size={22} />
              </Dialog.CloseTrigger>
            </header>

            <nav className="mobile-nav__links" aria-label="Mobile">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={onClose}>
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="mobile-nav__footer">
              <a href="#contact" className="btn btn-primary" onClick={onClose}>
                Start a project
              </a>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
