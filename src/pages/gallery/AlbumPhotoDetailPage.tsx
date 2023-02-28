import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { observer } from 'mobx-react';
import TopBar from '../../components/common/TopBar/TopBar';
import PhotoDetail from '../../components/pages/gallery/PhotoDetail';
import BottomMenu from '../../components/pages/gallery/BottomMenu';
import CommentMenu from '../../components/pages/gallery/CommentMenu';
import Icon from '../../components/common/Icon/Icon';
import {
  useCommentList,
  useGalleryDetail,
  usePostCommentMutation,
} from '../../hooks/queries/gallery.queries';
import { useDeletePhotosMutation } from '../../hooks/queries/album.queries';
import store from '../../stores/RootStore';
import Modal from '../../components/common/Modal/Modal';
import useToast from '../../hooks/common/useToast';

function AlbumPhotoDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { pId, aId } = useParams();
  const [commentIsVisible, setCommentIsvisible] = useState(false);
  const [onModal, setOnModal] = useState(false);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const photoId = pId ?? '';
  const albumId = aId ?? '';
  const title = location.state.title ? location.state.title : '';
  const subTitle = location.state.subTitle ? location.state.subTitle : '';

  const { data: photo } = useGalleryDetail({ coupleId, photoId });
  const { data: comments } = useCommentList({ coupleId, photoId });
  const { mutate: deletePhotoMutate } = useDeletePhotosMutation({
    coupleId,
    albumId,
  });
  const { mutate: postCommentMutate } = usePostCommentMutation({
    coupleId,
    photoId,
  });

  const makeComment = (content: string) => {
    postCommentMutate(content);
  };

  const deletePhotos = () => {
    if (photo?.id) {
      deletePhotoMutate([photo?.id], {
        onSuccess: () => {
          addToast('사진이 제거되었습니다.');
          navigate(`/gallery/album/${albumId}`, {
            state: {
              title,
              subTitle,
            },
          });
        },
      });
    }
  };

  return (
    <>
      <TopBar
        title={title}
        subTitle={subTitle}
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
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
          description="해당 사진이 앨범에서 제거됩니다."
          mainActionLabel="확인"
          onMainAction={deletePhotos}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </>
  );
}

export default observer(AlbumPhotoDetailPage);