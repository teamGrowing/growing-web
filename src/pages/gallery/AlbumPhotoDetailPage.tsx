import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import TopBar from 'components/common/TopBar/TopBar';
import PhotoDetail from 'components/pages/gallery/PhotoDetail';
import BottomMenu from 'components/pages/gallery/BottomMenu';
import CommentMenu from 'components/pages/gallery/CommentMenu';
import Icon from 'components/common/Icon/Icon';
import {
  useCommentList,
  useGalleryDetail,
  usePostCommentMutation,
  useDeletePhotosFromAlbumMutation,
} from 'hooks/queries';
import store from 'stores/RootStore';
import Modal from 'components/common/Modal/Modal';
import useToast from 'hooks/common/useToast';
import { MENT_GALLERY } from '../../constants/ments';

const Container = styled.div`
  position: relative;
`;
const DetailContainer = styled.div`
  position: relative;
  height: calc(100% - 72px);
`;

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
  const { mutate: deletePhotoMutate } = useDeletePhotosFromAlbumMutation({
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
          addToast(MENT_GALLERY.PHOTO_DELETE_FROM_ALBUM_SUCCESS);
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
    <Container className="page-container with-topbar">
      <TopBar
        title={title}
        subTitle={subTitle}
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <DetailContainer>
        {photo && <PhotoDetail photoInfo={photo} />}
      </DetailContainer>
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
          description={MENT_GALLERY.PHOTO_DELETE_FROM_ALBUM_CONFIRM}
          mainActionLabel="확인"
          onMainAction={deletePhotos}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </Container>
  );
}

export default observer(AlbumPhotoDetailPage);
