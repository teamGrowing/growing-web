import React, { useEffect } from 'react';
import GrowingRoutes from './Routes';
import ToastProvider from './components/common/ToastMessage/ToastProvider';

function App() {
  // webview 100vh
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    window.addEventListener('resize', setVh);
    setVh();
  }, []);

  return (
    <ToastProvider>
      <GrowingRoutes />
    </ToastProvider>
  );
}

export default App;
