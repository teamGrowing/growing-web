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
  const { pId } = useParams();
  const [commentIsVisible, setCommentIsvisible] = useState(false);
  const [onModal, setOnModal] = useState(false);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const photoId = pId ?? '';

  const { data: photo } = useGalleryDetail({ coupleId, photoId });
  const { data: comments } = useCommentList({ coupleId, photoId });
  const { mutate: deletePhotoMutate } = useDeletePhotosMutation({ coupleId });
  const { mutate: postCommentMutate } = usePostCommentMutation({
    coupleId,
    photoId,
  });

  const makeComment = (content: string) => {
    postCommentMutate(content);
  };

  const deletePhoto = () => {
    if (photo?.id) deletePhotoMutate([photo?.id]);
    navigate(`/gallery/photo`, {
      state: {
        toast: {
          showToast: true,
          message: '사진이 삭제되었습니다.',
        },
      },
    });
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
        onComment={() => setCommentIsvisible((prevState) => !prevState)}
        onMessage={() => {}}
        onTrash={() => setOnModal(true)}
      />
      {onModal && (
        <Modal
          setOnModal={setOnModal}
          onModal={onModal}
          description="해당 파일을 영구적으로 삭제합니다."
          mainActionLabel="확인"
          onMainAction={deletePhoto}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </>
  );
}

export default observer(PhotoDetailPage);
