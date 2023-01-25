import styled from 'styled-components';

import NavItem from './NavItem';
import { ReactComponent as AlbumSvg } from '../../assets/icons/navbar/navbarAlbum.svg';
import { ReactComponent as ChattingSvg } from '../../assets/icons/navbar/navbarChatting.svg';
import { ReactComponent as HomeSvg } from '../../assets/icons/navbar/navbarHome.svg';
import { ReactComponent as CalendarSvg } from '../../assets/icons/navbar/navbarCalendar.svg';
import { ReactComponent as MoreSvg } from '../../assets/icons/navbar/navbarMore.svg';

const Nav = styled.nav`
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 100;
`;
const NavItems = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 20px;
  gap: 22px;
  isolation: isolate;

  position: absolute;
  width: 100%;
  height: 81px;
  left: -1px;
  bottom: 0px;

  background: ${(props) => props.theme.color.white};
  border-top: 1px solid ${(props) => props.theme.color.gray100};
`;

function BottomNavigation() {
  return (
    <Nav>
      <NavItems>
        <NavItem linkTo="/gallery">
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

export default BottomNavigation;
