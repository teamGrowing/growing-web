import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import TopBar from 'components/common/TopBar/TopBar';
import MenuBox from 'components/pages/more/MenuBox';
import WhiteContainer from 'components/pages/more/WhiteContainer';
import Icon from 'components/common/Icon/Icon';
import PurpleBackground from 'styles/common/PurpleBackground';

const Container = styled.div`
  position: relative;
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

function InfoPage() {
  const navigate = useNavigate();
  return (
    <Container className="page-container">
      <PurpleBackground />
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate('/more')}
        title="도움말"
      />
      <WhiteContainer top="89px">
        <Menus>
          <MenuBox title="공지사항" icon="IconPet" onClick={() => {}} />
          <MenuBox title="이용방법" icon="IconPet" onClick={() => {}} />
          <MenuBox title="카톡문의" icon="IconPet" onClick={() => {}} />
        </Menus>
      </WhiteContainer>
    </Container>
  );
}
export default InfoPage;
