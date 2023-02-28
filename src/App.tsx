import ToastProvider from './components/common/ToastMessage/ToastProvider';
import GrowingRoutes from './Routes';

function App() {
  return (
    <ToastProvider>
      <GrowingRoutes />
    </ToastProvider>
  );
}

export default App;
