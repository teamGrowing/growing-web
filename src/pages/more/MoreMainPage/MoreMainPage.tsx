import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import Icon from 'components/common/Icon/Icon';
import MenuBox from 'components/pages/more/MenuBox';
import Profile from 'components/pages/more/Profile';
import SideButton from 'components/pages/more/SideButton';
import WhiteContainer from 'components/pages/more/WhiteContainer';
import store from 'stores/RootStore';
import preventScroll from 'util/utils';
import defaultProfile from 'assets/image/DefaultProfile.png';
import Modal from 'components/common/Modal/Modal';
import { MENT_LOGOUT } from 'constants/ments';
import * as S from './MoreMainPage.styled';

function MoreMainPage() {
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <S.Container className="page-container with-navbar">
      <S.IconWrapper>
        <Icon icon="IconLogo" themeColor="white" size={211} />
      </S.IconWrapper>
      <S.ScrollArea className="hidden-scrollbar">
        <SideButton
          value="프로필 수정"
          abLeft="75%"
          abTop="70px"
          onClick={() => navigate('profile')}
        />
        <S.ProfileContainer>
          <Profile
            imgUrl={store.userStore.user?.imageUrl ?? defaultProfile}
            border
          />
        </S.ProfileContainer>
        <WhiteContainer top="347px">
          <S.Label>{store.userStore.user?.nickName}</S.Label>
          <S.Menus>
            <MenuBox
              title="동물도감"
              icon="IconPet"
              onClick={() => navigate('pet')}
            />
            <MenuBox
              title="설정"
              icon="IconSetting"
              onClick={() => navigate('setting')}
            />
            <MenuBox
              title="도움말"
              icon="IconInfo"
              onClick={() => navigate('info')}
            />
            <MenuBox
              title="로그아웃"
              icon="IconSmile"
              onClick={() => setOnModal(true)}
            />
          </S.Menus>
        </WhiteContainer>
      </S.ScrollArea>
      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        onMainAction={() => {
          store.userStore.logout();
          navigate('/login/kakao');
        }}
        title={MENT_LOGOUT.CONFIRM}
        mainActionLabel="네"
        subActionLabel="아니오"
        onSubAction={() => {}}
      />
    </S.Container>
  );
}
export default observer(MoreMainPage);
