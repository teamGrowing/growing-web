import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../../components/common/Icon/Icon';
import MenuBox from '../../components/pages/more/MenuBox';
import Profile from '../../components/pages/more/Profile';
import SideButton from '../../components/pages/more/SideButton';
import WhiteContainer from '../../components/pages/more/WhiteContainer';

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: -1;
  background-color: ${({ theme }) => theme.color.purple50};
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  padding: 10px 5px;
  gap: 10px;
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
  return (
    <>
      <Background />
      <SideButton
        value="프로필 수정"
        abLeft="75%"
        abTop="70px"
        onClick={() => navigate('profile')}
      />
      <IconWrapper>
        <Icon icon="IconLogo" themeColor="white" size={211} />
      </IconWrapper>
      <ProfileContainer>
        <Profile imgUrl="" border />
      </ProfileContainer>
      <WhiteContainer top="347px">
        <Label>별이</Label>
        <Row>
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
        </Row>
        <Row>
          <MenuBox
            title="도움말"
            icon="IconInfo"
            onClick={() => navigate('info')}
          />
        </Row>
      </WhiteContainer>
    </>
  );
}
export default MoreMainPage;
