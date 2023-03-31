import React from 'react';
import GrowingRoutes from './Routes';
import ToastProvider from './components/common/ToastMessage/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <GrowingRoutes />
    </ToastProvider>
  );
}

export default App;
