import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDeleteCommentMutation } from 'hooks/queries';
import store from 'stores/RootStore';
import { PhotoCommentDto } from 'models/gallery';
import Modal from 'components/common/Modal/Modal';
import useToast from 'hooks/common/useToast';
import { MENT_GALLERY } from 'constants/ments';
import { observer } from 'mobx-react';
import * as S from './Comment.styled';

type CommentProps = {
  commentInfo: PhotoCommentDto;
};

const Comment = ({ commentInfo }: CommentProps) => {
  const { pId } = useParams();
  const { addToast } = useToast();
  const [onModal, setOnModal] = useState(false);
  const { mutate: deleteComment } = useDeleteCommentMutation({
    coupleId: store.userStore.user?.coupleId!,
    photoId: pId!,
    options: {
      onError: () => {
        addToast(MENT_GALLERY.COMMENT_DELETE_FAIL);
      },
      onSuccess: () => {
        addToast(MENT_GALLERY.COMMENT_DELETE_SUCCESS);
      },
      useErrorBoundary: false,
    },
  });

  return (
    <S.CommentContainer>
      <S.Name>{commentInfo.name}</S.Name>
      <S.Content>{commentInfo.content}</S.Content>
      {commentInfo.isMine && (
        <S.Delete onClick={() => setOnModal(true)}>삭제</S.Delete>
      )}
      {onModal && (
        <Modal
          onModal={onModal}
          setOnModal={setOnModal}
          description="댓글을 삭제하시겠습니까?"
          mainActionLabel="확인"
          onMainAction={() => deleteComment(commentInfo.id)}
          subActionLabel="취소"
        />
      )}
    </S.CommentContainer>
  );
};

export default observer(Comment);
