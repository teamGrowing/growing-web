import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
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

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.purple50};
`;
const ScrollArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 52px);
  overflow-y: scroll;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 6px;
  gap: 10px;

  position: absolute;
  left: -29px;
  top: 40px;
`;

const Menus = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  gap: 30px 20%;
  padding: 0 10px;
`;

const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px 14px;
  gap: 10px;
  color: ${({ theme }) => theme.color.white};

  position: absolute;
  min-width: 61px;
  height: 33px;
  left: 50%;
  transform: translate(-50%, 0%);
  top: -16.5px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.8) 7.3%,
    rgba(234, 96, 96, 0.8) 100%
  );

  box-shadow: 0px 3px 4px ${({ theme }) => theme.color.black}3f;
  border-radius: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 107px 0;
`;

function MoreMainPage() {
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <Container className="page-container with-navbar">
      <IconWrapper>
        <Icon icon="IconLogo" themeColor="white" size={211} />
      </IconWrapper>
      <ScrollArea className="hidden-scrollbar">
        <SideButton
          value="프로필 수정"
          abLeft="75%"
          abTop="70px"
          onClick={() => navigate('profile')}
        />
        <ProfileContainer>
          <Profile
            imgUrl={store.userStore.user?.imageUrl ?? defaultProfile}
            border
          />
        </ProfileContainer>
        <WhiteContainer top="347px">
          <Label>{store.userStore.user?.nickName}</Label>
          <Menus>
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
          </Menus>
        </WhiteContainer>
      </ScrollArea>
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
    </Container>
  );
}
export default observer(MoreMainPage);
