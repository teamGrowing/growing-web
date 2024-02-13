import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

export const PortalName = {
  'modal-root': 'modal-root',
  'toast-message-root': 'toast-message-root',
};

type PortalType = keyof typeof PortalName;

interface Props extends PropsWithChildren {
  type: PortalType;
}

export default function Portal({ type, children }: Props) {
  const portal = document.getElementById(type);

  if (!portal) {
    return null;
  }

  return ReactDOM.createPortal(children, portal);
}
