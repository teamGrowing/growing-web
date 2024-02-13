import React, { ComponentProps, Suspense } from 'react';
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithRender,
} from 'react-error-boundary';

interface Props extends Omit<ErrorBoundaryPropsWithRender, 'fallbackRender'> {
  pendingFallback: ComponentProps<typeof Suspense>['fallback'];
  rejectedFallback: ErrorBoundaryPropsWithRender['fallbackRender'];
  children: React.ReactElement;
}

export default function AsyncBoundary({
  pendingFallback,
  rejectedFallback,
  children,
  ...errorBoundaryProps
}: Props) {
  return (
    <ErrorBoundary fallbackRender={rejectedFallback} {...errorBoundaryProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
