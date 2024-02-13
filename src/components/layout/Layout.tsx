import { Outlet } from 'react-router-dom';
import ButtomNavigation from './BottomNavigation/BottomNavigation';

function Layout() {
  return (
    <>
      <Outlet />
      <ButtomNavigation />
    </>
  );
}
export default Layout;
