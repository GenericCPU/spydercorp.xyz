import { Toast, Toaster } from '@ark-ui/react/toast';
import { X } from 'lucide-react';
import { toaster } from '../lib/toaster';
import './Toast.css';

export function AppToaster() {
  return (
    <Toaster toaster={toaster} className="sc-toaster">
      {(toast) => (
        <Toast.Root key={toast.id} className="sc-toast">
          <Toast.Title className="sc-toast__title">{toast.title}</Toast.Title>
          {toast.description ? (
            <Toast.Description className="sc-toast__description">
              {toast.description}
            </Toast.Description>
          ) : null}
          {toast.closable !== false ? (
            <Toast.CloseTrigger className="sc-toast__close" aria-label="Dismiss">
              <X size={16} strokeWidth={2} aria-hidden />
            </Toast.CloseTrigger>
          ) : null}
        </Toast.Root>
      )}
    </Toaster>
  );
}
