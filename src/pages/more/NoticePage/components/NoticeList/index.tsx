import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { FallbackProps } from 'react-error-boundary';
import { useNoticeList } from 'hooks/queries';
import Skeleton from 'react-loading-skeleton';
import * as S from './NoticeList.styled';

const NoticeList = () => {
  const navigate = useNavigate();
  const { data } = useNoticeList();

  return (
    <>
      {data?.map((notice) => (
        <S.Box key={notice.id} onClick={() => navigate(`${notice.id}`)}>
          <S.Title>{notice.title}</S.Title>
          <S.Date>{dayjs(notice.createdAt).format('YYYY-MM-DD')}</S.Date>
        </S.Box>
      ))}
    </>
  );
};

NoticeList.Loading = () => {
  return (
    <>
      <Skeleton height={62} borderRadius={10} />
      <Skeleton height={62} borderRadius={10} />
    </>
  );
};

NoticeList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <S.ErrorMessage>일시적인 오류로 불러오지 못했어요.</S.ErrorMessage>
      <S.Button onClick={resetErrorBoundary}>다시 불러오기</S.Button>
    </S.ErrorContainer>
  );
};

export default NoticeList;
