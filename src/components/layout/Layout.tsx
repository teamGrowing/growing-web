import React, { PropsWithChildren } from 'react';
import ButtomNavigation from './BottomNavigation';

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <ButtomNavigation />
    </>
  );
}
export default Layout;
