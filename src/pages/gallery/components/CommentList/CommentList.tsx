import { useCommentList } from 'hooks/queries';
import { useParams } from 'react-router-dom';
import store from 'stores/RootStore';
import Skeleton from 'react-loading-skeleton';
import Icon from 'components/common/Icon/Icon';
import { ErrorMessage } from 'components/common/fallback/Common';
import { FallbackProps } from 'react-error-boundary';
import Comment from '../Comment/Comment';
import * as S from './CommentList.styled';

const CommentList = () => {
  const { pId } = useParams();
  const { data: comments } = useCommentList({
    coupleId: store.userStore.user?.coupleId ?? '',
    photoId: pId ?? '',
  });

  return (
    <>
      {(comments ?? []).map((c) => (
        <Comment commentInfo={c} key={c.id} />
      ))}
    </>
  );
};

CommentList.Loading = () => {
  return (
    <>
      <S.SkeletonContainer>
        <Skeleton width={30} baseColor="#e1979733" highlightColor="#ffffff33" />
        <Skeleton
          width="100%"
          baseColor="#e1979733"
          highlightColor="#ffffff33"
        />
      </S.SkeletonContainer>
      <S.SkeletonContainer>
        <Skeleton width={30} baseColor="#e1979733" highlightColor="#ffffff33" />
        <Skeleton
          width="100%"
          baseColor="#e1979733"
          highlightColor="#ffffff33"
        />
      </S.SkeletonContainer>
      <S.SkeletonContainer>
        <Skeleton width={30} baseColor="#e1979733" highlightColor="#ffffff33" />
        <Skeleton
          width="100%"
          baseColor="#e1979733"
          highlightColor="#ffffff33"
        />
      </S.SkeletonContainer>
    </>
  );
};

CommentList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <Icon
        icon="IconRefresh"
        themeColor="gray700"
        onClick={resetErrorBoundary}
      />
      <ErrorMessage>오류가 발생했습니다.</ErrorMessage>
    </>
  );
};

export default CommentList;
