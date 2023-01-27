import { Outlet } from 'react-router-dom';
import ButtomNavigation from './BottomNavigation';

function Layout() {
  return (
    <>
      <Outlet />
      <ButtomNavigation />
    </>
  );
}
export default Layout;
