import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import WhiteContainer from 'components/pages/more/WhiteContainer';
import { useNoticeDetail } from 'hooks/queries';
import { useNavigate, useParams } from 'react-router-dom';
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
  const { id } = useParams();
  const { data: notice } = useNoticeDetail({ noticeId: id ?? '' });

  return (
    <Container className="page-container">
      <TopBar
        title={notice?.title}
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <PurpleBackground />
      <WhiteContainer top="89px">
        <Content>{notice?.context}</Content>
      </WhiteContainer>
    </Container>
  );
}
export default NoticeDetailPage;
