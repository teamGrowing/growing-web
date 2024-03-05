import { PropsWithChildren } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

interface Props extends PropsWithChildren {
  fallbackComponent: React.ComponentType<FallbackProps>;
}

const BlockErrorBoundary = ({ children, fallbackComponent }: Props) => {
  const { reset } = useQueryErrorResetBoundary();
  const { key } = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={fallbackComponent}
      onReset={reset}
      resetKeys={[key]}
    >
      {children}
    </ErrorBoundary>
  );
};

export default BlockErrorBoundary;
