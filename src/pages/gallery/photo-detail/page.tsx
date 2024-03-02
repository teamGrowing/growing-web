import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { observer } from 'mobx-react';
import TopBar from 'components/common/TopBar/TopBar';
import BottomMenu from 'pages/gallery/components/BottomMenu/BottomMenu';
import CommentMenu from 'pages/gallery/components/CommentMenu/CommentMenu';
import Icon from 'components/common/Icon/Icon';
import { useDeletePhotosMutation, usePostCommentMutation } from 'hooks/queries';
import { MENT_GALLERY } from 'constants/ments';
import store from 'stores/RootStore';
import Modal from 'components/common/Modal/Modal';
import useToast from 'hooks/common/useToast';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import PhotoDetail from '../components/PhotoDetail/PhotoDetail';
import * as S from './page.styled';

const PhotoDetailPage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { pId } = useParams();
  const [commentIsVisible, setCommentIsvisible] = useState(false);
  const [onModal, setOnModal] = useState(false);

  const coupleId = store.userStore.user?.coupleId ?? '';
  const photoId = pId ?? '';

  const { mutate: deletePhotoMutate } = useDeletePhotosMutation({ coupleId });
  const { mutate: postCommentMutate } = usePostCommentMutation({
    coupleId,
    photoId,
  });

  const makeComment = (content: string) => {
    postCommentMutate(content);
  };

  const deletePhoto = () => {
    if (pId)
      deletePhotoMutate([pId], {
        onSuccess: () => {
          addToast(MENT_GALLERY.PHOTO_DELETE_SUCCESS);
          navigate(`/gallery/photo`);
        },
      });
  };

  return (
    <S.Container>
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <S.DetailContainer className="hidden-scrollbar">
        <BlockErrorBoundary fallbackComponent={PhotoDetail.Error}>
          <Suspense fallback={<PhotoDetail.Loading />}>
            <PhotoDetail />
          </Suspense>
        </BlockErrorBoundary>
      </S.DetailContainer>
      {commentIsVisible && <CommentMenu onComment={makeComment} />}
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
    </S.Container>
  );
};

export default observer(PhotoDetailPage);
