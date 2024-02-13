import { useRef } from 'react';
import PhotoCommentDto from 'types/gallery/PhotoComment.dto';
import Icon from 'components/common/Icon/Icon';
import Comment from '../Comment/Comment';
import * as S from './CommentMenu.styled';

type CommentMenuProps = {
  comments: PhotoCommentDto[];
  onComment: (data: string) => void;
};

function CommentMenu({ comments, onComment }: CommentMenuProps) {
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
        {comments.map((c) => (
          <Comment commentInfo={c} key={c.id} />
        ))}
      </S.CommentsContainer>
      <S.CommentInput>
        <S.Input ref={inputRef} />
        <S.Send onClick={onClickSendBtnHandler}>
          <Icon icon="IconAirplane" themeColor="white" />
        </S.Send>
      </S.CommentInput>
    </S.Box>
  );
}

export default CommentMenu;
