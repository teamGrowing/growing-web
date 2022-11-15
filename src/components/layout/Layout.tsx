import React, { PropsWithChildren } from "react";
import ButtomNavigation from "./BottomNavigation";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <React.Fragment>
      {children}
      <ButtomNavigation />
    </React.Fragment>
  );
};
export default Layout;
