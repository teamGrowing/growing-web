import styled from 'styled-components';

import NavItem from './NavItem';
import Icon from '../common/Icon/Icon';

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
  isolation: isolate;

  position: absolute;
  width: 100%;
  height: 81px;
  left: -1px;
  bottom: 0px;

  background: ${(props) => props.theme.color.white};
  border-top: 1px solid ${(props) => props.theme.color.gray100};
`;
const Label = styled.p`
  text-align: center;
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

function BottomNavigation() {
  return (
    <Nav>
      <NavItems>
        <NavItem linkTo="/gallery">
          <Icon icon="IconPhotoHeart" />
          <Label className="text-gradient400">앨범</Label>
        </NavItem>
        <NavItem linkTo="/chatting">
          <Icon icon="IconChat" />
          <Label className="text-gradient400">채팅</Label>
        </NavItem>
        <NavItem linkTo="/">
          <Icon icon="IconHome" />
          <Label className="text-gradient400">홈</Label>
        </NavItem>
        <NavItem linkTo="/calendar">
          <Icon icon="IconCalendar" />
          <Label className="text-gradient400">일정</Label>
        </NavItem>
        <NavItem linkTo="/more">
          <Icon icon="IconBar" />
          <Label className="text-gradient400">더보기</Label>
        </NavItem>
      </NavItems>
    </Nav>
  );
}

export default BottomNavigation;
