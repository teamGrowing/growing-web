import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import WhiteContainer from 'components/pages/more/WhiteContainer/WhiteContainer';
import dayjs from 'dayjs';
import { useNoticeList } from 'hooks/queries';
import { useNavigate } from 'react-router-dom';
import PurpleBackground from 'styles/common/PurpleBackground';
import * as S from './NoticePage.styled';

function NoticePage() {
  const navigate = useNavigate();
  const { data } = useNoticeList();

  return (
    <S.Container className="page-container">
      <PurpleBackground />
      <TopBar
        title="공지사항"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <WhiteContainer top="89px">
        {data?.map((notice) => (
          <S.Box key={notice.id} onClick={() => navigate(`${notice.id}`)}>
            <S.Title>{notice.title}</S.Title>
            <S.Date>{dayjs(notice.createdAt).format('YYYY-MM-DD')}</S.Date>
            <S.Border />
          </S.Box>
        ))}
      </WhiteContainer>
    </S.Container>
  );
}
export default NoticePage;
