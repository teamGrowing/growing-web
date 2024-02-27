import { ErrorBoundary } from 'react-error-boundary';
import FloatingButton from './FloatingButton';

const FloatingButtonWrapper = () => {
  return (
    <ErrorBoundary fallback={<p>error</p>}>
      <FloatingButton />
    </ErrorBoundary>
  );
};

export default FloatingButtonWrapper;
