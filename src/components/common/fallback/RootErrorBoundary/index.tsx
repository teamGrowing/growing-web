import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';
import Fallback from './Fallback';

const RootErrorBoundary = ({ children }: PropsWithChildren) => {
  const { key } = useLocation();

  return (
    <ErrorBoundary FallbackComponent={Fallback} resetKeys={[key]}>
      {children}
    </ErrorBoundary>
  );
};

export default RootErrorBoundary;
