import Icon from 'components/common/Icon/Icon';
import NavItem from '../NavItem/NavItem';
import * as S from './BottomNavigation.styled';

function BottomNavigation() {
  return (
    <S.Nav>
      <S.NavItems>
        <NavItem linkTo="/gallery">
          <Icon icon="IconPhotoHeart" />
          <S.Label>앨범</S.Label>
        </NavItem>
        <NavItem linkTo="/chat">
          <Icon icon="IconChat" />
          <S.Label>채팅</S.Label>
        </NavItem>
        <NavItem linkTo="/">
          <Icon icon="IconHome" />
          <S.Label>홈</S.Label>
        </NavItem>
        <NavItem linkTo="/calendar">
          <Icon icon="IconCalendar" />
          <S.Label>일정</S.Label>
        </NavItem>
        <NavItem linkTo="/more">
          <Icon icon="IconBar" />
          <S.Label>더보기</S.Label>
        </NavItem>
      </S.NavItems>
    </S.Nav>
  );
}

export default BottomNavigation;
