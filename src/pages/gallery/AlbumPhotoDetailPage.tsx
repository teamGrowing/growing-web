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

function AlbumPhotoDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pId: photoId, aId: albumId } = useParams();
  const [commentIsVisible, setCommentIsvisible] = useState(false);
  const [onModal, setOnModal] = useState(false);
  const { data: photo } = useGalleryDetail({
    coupleId: store.userStore.user?.coupleId!,
    photoId: photoId ?? '',
  });
  const { data: comments } = useCommentList({
    coupleId: store.userStore.user?.coupleId!,
    photoId: photoId ?? '',
  });
  const { mutate: deletePhotoMutate } = useDeletePhotosMutation({
    coupleId: store.userStore.user?.coupleId!,
    albumId: albumId ?? '',
  });
  const { mutate: postCommentMutate } = usePostCommentMutation({
    coupleId: store.userStore.user?.coupleId!,
    photoId: photoId ?? '',
  });
  const title = location.state.title ? location.state.title : '';
  const subTitle = location.state.subTitle ? location.state.subTitle : '';

  const makeComment = (content: string) => {
    postCommentMutate(content);
    // TODO comment 관련 기능
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
          description="해당 사진이 앨범에서 제거됩니다."
          mainActionLabel="확인"
          onMainAction={() => {
            if (photo?.id) deletePhotoMutate([photo?.id]);
            navigate(`/gallery/album/${albumId}`, {
              state: {
                title,
                subTitle,
                toast: {
                  showToast: true,
                  message: '사진이 제거되었습니다.',
                },
              },
            });
          }}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </>
  );
}

export default observer(AlbumPhotoDetailPage);
