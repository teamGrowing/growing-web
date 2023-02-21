import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDeleteCommentMutation } from '../../../hooks/queries/gallery.queries';
import store from '../../../stores/RootStore';
import PhotoCommentDto from '../../../types/gallery/PhotoComment.dto';
import Modal from '../../common/Modal/Modal';

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  width: 100%;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const Name = styled.div`
  font-family: 'PretendardRegular';
  font-size: 15px;
  line-height: 18px;

  padding: 0 14px;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Content = styled.div`
  font-family: 'PretendardLight';
  font-size: 14px;
  line-height: 17px;

  max-width: calc(100% - 58px - 28px);
  word-wrap: break-word;

  color: ${({ theme }) => theme.color.gray900};

  flex: none;
  order: 0;
  flex-grow: 1;
`;
const Delete = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

type CommentProps = {
  commentInfo: PhotoCommentDto;
};

function Comment({ commentInfo }: CommentProps) {
  const { pId } = useParams();
  const [onModal, setOnModal] = useState(false);
  const { mutate: deleteComment } = useDeleteCommentMutation({
    coupleId: store.userStore.user?.coupleId!,
    photoId: pId!,
  });

  return (
    <CommentContainer>
      <Name>{commentInfo.name}</Name>
      <Content>{commentInfo.content}</Content>
      {commentInfo.isMine && (
        <Delete onClick={() => setOnModal(true)}>삭제</Delete>
      )}
      {onModal && (
        <Modal
          onModal={onModal}
          setOnModal={setOnModal}
          description="댓글을 삭제하시겠습니까?"
          mainActionLabel="확인"
          onMainAction={() => deleteComment(commentInfo.id)}
          subActionLabel="취소"
          onSubAction={() => {}}
        />
      )}
    </CommentContainer>
  );
}

export default Comment;
