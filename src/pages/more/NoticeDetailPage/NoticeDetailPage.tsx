import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import WhiteContainer from 'pages/more/components/WhiteContainer/WhiteContainer';
import { useNoticeDetail } from 'hooks/queries';
import { useNavigate, useParams } from 'react-router-dom';
import MainBackground from 'styles/common/MainBackground';
import * as S from './NoticeDetailPage.styled';

function NoticeDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: notice } = useNoticeDetail({ noticeId: id ?? '' });

  return (
    <S.Container className="page-container">
      <TopBar
        title={notice?.title}
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <MainBackground />
      <WhiteContainer top="89px">
        <S.Content>{notice?.context}</S.Content>
      </WhiteContainer>
    </S.Container>
  );
}
export default NoticeDetailPage;
