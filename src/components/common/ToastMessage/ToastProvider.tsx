import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import ToastContext from './ToastContext';
import ToastMessage from './ToastMessage';

let id = 0;

function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

  const addToast = useCallback((msg: string) => {
    id += 1;
    setToasts((prevToasts) => [...prevToasts, { id, message: msg }]);
  }, []);

  const removeToast = useCallback((tId: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== tId));
  }, []);

  const ctxValue = useMemo(() => {
    return { addToast, removeToast };
  }, [addToast, removeToast]);

  return (
    <ToastContext.Provider value={ctxValue}>
      {children}
      {toasts.map((toast) => (
        <ToastMessage key={toast.id} message={toast.message} id={toast.id} />
      ))}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
