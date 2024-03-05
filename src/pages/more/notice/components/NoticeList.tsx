import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useNoticeList } from 'hooks/queries';
import Skeleton from 'react-loading-skeleton';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import { FallbackProps } from 'react-error-boundary';
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
    <S.LoadingContainer>
      {new Array(20).fill(null).map((_, i) => (
        <Skeleton height={62} borderRadius={10} key={i} />
      ))}
    </S.LoadingContainer>
  );
};

NoticeList.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <BlockErrorFallback.Common
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      containerStyle={{ height: '100%' }}
    />
  );
};

export default NoticeList;
