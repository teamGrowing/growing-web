import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import WhiteContainer from 'components/pages/more/WhiteContainer';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PurpleBackground from 'styles/common/PurpleBackground';

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  font-family: 'PretendardNormal';
`;

function NoticeDetailPage() {
  const navigate = useNavigate();
  return (
    <Container className="page-container">
      <TopBar
        title="v1.0.0 출시"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <PurpleBackground />
      <WhiteContainer top="89px">
        <Content>그로잉 v1.0.0이 출시되었습니다.</Content>
      </WhiteContainer>
    </Container>
  );
}
export default NoticeDetailPage;
