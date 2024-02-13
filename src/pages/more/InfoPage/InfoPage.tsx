import { useNavigate } from 'react-router-dom';
import TopBar from 'components/common/TopBar/TopBar';
import MenuBox from 'components/pages/more/MenuBox/MenuBox';
import WhiteContainer from 'components/pages/more/WhiteContainer/WhiteContainer';
import Icon from 'components/common/Icon/Icon';
import PurpleBackground from 'styles/common/PurpleBackground';
import * as S from './InfoPage.styled';

function InfoPage() {
  const navigate = useNavigate();
  return (
    <S.Container className="page-container">
      <PurpleBackground />
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="도움말"
      />
      <WhiteContainer top="89px">
        <S.Menus>
          <MenuBox
            title="공지사항"
            icon="IconPet"
            onClick={() => navigate('notice')}
          />
          {/* <MenuBox title="이용방법" icon="IconPet" onClick={() => {}} />
          <MenuBox title="카톡문의" icon="IconPet" onClick={() => {}} /> */}
        </S.Menus>
      </WhiteContainer>
    </S.Container>
  );
}
export default InfoPage;
