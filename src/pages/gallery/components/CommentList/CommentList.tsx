import { useCommentList } from 'hooks/queries';
import { useParams } from 'react-router-dom';
import store from 'stores/RootStore';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import { MENT_GALLERY } from 'constants/ments';
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

CommentList.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <BlockErrorFallback.Icon
        error={error}
        resetErrorBoundary={resetErrorBoundary}
        errorMessage={MENT_GALLERY.COMMENT_LOAD_FAIL}
        size={40}
        containerStyle={{
          gap: '10px',
        }}
      />
    </>
  );
};

export default CommentList;
