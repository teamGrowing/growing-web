import { PropsWithChildren, Suspense } from 'react';
import Fallback from './Fallback';

const RootSuspense = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
};

export default RootSuspense;
