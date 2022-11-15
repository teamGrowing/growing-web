import styled from 'styled-components';

import NavItem from './NavItem';
import { ReactComponent as AlbumSvg } from '../../assets/icons/navbar/navbarAlbum.svg';
import { ReactComponent as ChattingSvg } from '../../assets/icons/navbar/navbarChatting.svg';
import { ReactComponent as HomeSvg } from '../../assets/icons/navbar/navbarHome.svg';
import { ReactComponent as CalendarSvg } from '../../assets/icons/navbar/navbarCalendar.svg';
import { ReactComponent as MoreSvg } from '../../assets/icons/navbar/navbarMore.svg';

function BottomNavigation() {
  return (
    <Nav>
      <NavItems>
        <NavItem linkTo="/album">
          <AlbumSvg width="46" height="45" className="svg" />
        </NavItem>
        <NavItem linkTo="/chatting">
          <ChattingSvg width="46" height="45" className="svg" />
        </NavItem>
        <NavItem linkTo="/">
          <HomeSvg width="46" height="45" className="svg" />
        </NavItem>
        <NavItem linkTo="/calendar">
          <CalendarSvg width="46" height="45" className="svg" />
        </NavItem>
        <NavItem linkTo="/more">
          <MoreSvg width="46" height="45" className="svg" />
        </NavItem>
      </NavItems>
    </Nav>
  );
}

const Nav = styled.nav`
  width: 100%;
  text-align: center;
  position: fixed;
  bottom: 0;
`;
const NavItems = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
`;

export default BottomNavigation;
