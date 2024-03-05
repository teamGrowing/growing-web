import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { useNoticeDetail } from 'hooks/queries';
import { FallbackProps } from 'react-error-boundary';
import Spacing from 'components/common/Spacing';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import * as S from './NoticeContent.styled';

const NoticeContent = () => {
  const { id } = useParams();
  const { data: notice } = useNoticeDetail({ noticeId: id ?? '' });

  return (
    <>
      <S.Head>
        <S.Title>{notice?.title}</S.Title>
        <S.Date>{dayjs(notice?.updatedAt).format('YYYY.MM.DD')}</S.Date>
      </S.Head>
      <S.Border />
      <S.Content>{notice?.context}</S.Content>
    </>
  );
};

NoticeContent.Loading = () => {
  return (
    <>
      <S.Head>
        <Spacing height={3} />
        <Skeleton height={18} width={200} />
        <Spacing height={8} />
        <Skeleton height={14} width={100} />
        <Spacing height={5} />
      </S.Head>

      <S.Border />

      <Spacing height={10} />
      <Skeleton height={20} width={300} />
    </>
  );
};

NoticeContent.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <BlockErrorFallback.Common
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      containerStyle={{ height: '100%' }}
    />
  );
};

export default NoticeContent;
