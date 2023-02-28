import React from 'react';

const toastContext: {
  addToast: (message: string) => void;
  removeToast: (id: number) => void;
} = {
  addToast: () => {},
  removeToast: () => {},
};

const ToastContext = React.createContext(toastContext);

export default ToastContext;
