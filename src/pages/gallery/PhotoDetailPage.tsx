import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import TopBar from 'components/common/TopBar/TopBar';
import PhotoDetail from 'components/pages/gallery/PhotoDetail';
import BottomMenu from 'components/pages/gallery/BottomMenu';
import CommentMenu from 'components/pages/gallery/CommentMenu';
import Icon from 'components/common/Icon/Icon';
import {
  useCommentList,
  useDeletePhotosMutation,
  useGalleryDetail,
  usePostCommentMutation,
} from 'hooks/queries/gallery.queries';
import { MENT_GALLERY } from 'constants/ments';
import store from 'stores/RootStore';
import Modal from 'components/common/Modal/Modal';
import useToast from 'hooks/common/useToast';
import preventScroll from 'util/utils';

const Container = styled.div`
  position: relative;
`;
const DetailContainer = styled.div`
  position: relative;
  height: calc(100% - 72px);
`;

function PhotoDetailPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
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
    if (photo?.id)
      deletePhotoMutate([photo?.id], {
        onSuccess: () => {
          addToast(MENT_GALLERY.PHOTO_DELETE_SUCCESS);
          navigate(`/gallery/photo`);
        },
      });
  };

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <Container className="page-container with-topbar">
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => {
          navigate(-1);
        }}
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
          description={MENT_GALLERY.PHOTO_DELETE_DESCRIPTION}
          mainActionLabel="확인"
          onMainAction={deletePhoto}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </Container>
  );
}

export default observer(PhotoDetailPage);
