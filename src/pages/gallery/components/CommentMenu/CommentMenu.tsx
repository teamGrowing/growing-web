import { Suspense, useRef } from 'react';
import Icon from 'components/common/Icon/Icon';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './CommentMenu.styled';
import CommentList from '../CommentList/CommentList';

type Props = {
  onComment: (data: string) => void;
};

const CommentMenu = ({ onComment }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickSendBtnHandler = () => {
    if (!inputRef.current?.value) return;

    onComment(inputRef.current?.value);
    inputRef.current.value = '';
  };

  return (
    <S.Box>
      <S.Title>댓글 남기기</S.Title>
      <S.CommentsContainer>
        <BlockErrorBoundary fallbackComponent={CommentList.Error}>
          <Suspense fallback={<CommentList.Loading />}>
            <CommentList />
          </Suspense>
        </BlockErrorBoundary>
      </S.CommentsContainer>
      <S.CommentInput>
        <S.Input ref={inputRef} />
        <S.Send onClick={onClickSendBtnHandler}>
          <Icon icon="IconAirplane" themeColor="white" />
        </S.Send>
      </S.CommentInput>
    </S.Box>
  );
};

export default CommentMenu;
