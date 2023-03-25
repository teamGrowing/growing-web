import styled from 'styled-components';
import NavItem from './NavItem';
import Icon from '../common/Icon/Icon';

const Nav = styled.nav`
  width: 100%;
  max-width: 780px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
const NavItems = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px 0;
  padding-bottom: constants(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  isolation: isolate;

  position: absolute;
  width: 100%;
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
          <Label>앨범</Label>
        </NavItem>
        <NavItem linkTo="/chat">
          <Icon icon="IconChat" />
          <Label>채팅</Label>
        </NavItem>
        <NavItem linkTo="/">
          <Icon icon="IconHome" />
          <Label>홈</Label>
        </NavItem>
        <NavItem linkTo="/calendar">
          <Icon icon="IconCalendar" />
          <Label>일정</Label>
        </NavItem>
        <NavItem linkTo="/more">
          <Icon icon="IconBar" />
          <Label>더보기</Label>
        </NavItem>
      </NavItems>
    </Nav>
  );
}

export default BottomNavigation;
