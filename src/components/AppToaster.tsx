import { Toast } from '@aeon-ui/react';
import './Toast.css';

export function AppToaster() {
  return <Toast.Viewport placement="bottom-end" className="sc-toaster" />;
}
