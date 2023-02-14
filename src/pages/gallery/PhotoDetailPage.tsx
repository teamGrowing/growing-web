import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { observer } from 'mobx-react';
import TopBar from '../../components/common/TopBar/TopBar';
import PhotoDetail from '../../components/pages/gallery/PhotoDetail';
import BottomMenu from '../../components/pages/gallery/BottomMenu';
import CommentMenu from '../../components/pages/gallery/CommentMenu';
import Icon from '../../components/common/Icon/Icon';
import {
  useCommentList,
  useDeletePhotosMutation,
  useGalleryDetail,
  usePostCommentMutation,
} from '../../hooks/queries/gallery.queries';
import store from '../../stores/RootStore';
import Modal from '../../components/common/Modal/Modal';

function PhotoDetailPage() {
  const navigate = useNavigate();
  const { id: params } = useParams();
  const [commentIsVisible, setCommentIsvisible] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const { data: photo } = useGalleryDetail({
    coupleId: store.userStore.user?.coupleId!,
    photoId: params ?? '',
  });
  const { data: comments } = useCommentList({
    coupleId: store.userStore.user?.coupleId!,
    photoId: params ?? '',
  });
  const { mutate: deletePhotoMutate } = useDeletePhotosMutation({
    coupleId: store.userStore.user?.coupleId!,
  });
  const { mutate: postCommentMutate } = usePostCommentMutation({
    coupleId: store.userStore.user?.coupleId!,
    photoId: params ?? '',
  });

  const makeComment = (content: string) => {
    postCommentMutate(content);
    // TODO comment 관련 기능
  };

  return (
    <>
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => {
          navigate(-1);
        }}
      />
      {photo && <PhotoDetail photoInfo={photo} />}
      {commentIsVisible && (
        <CommentMenu comments={comments ?? []} onComment={makeComment} />
      )}
      <BottomMenu
        border={!commentIsVisible}
        onComment={() => {
          setCommentIsvisible((prevState) => !prevState);
        }}
        onMessage={() => {}}
        onTrash={() => setOnModal(true)}
      />
      {onModal && (
        <Modal
          setOnModal={setOnModal}
          onModal={onModal}
          description="해당 파일을 영구적으로 삭제합니다."
          mainActionLabel="확인"
          onMainAction={() => {
            if (photo?.id) deletePhotoMutate([photo?.id]);
          }}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </>
  );
}

export default observer(PhotoDetailPage);
