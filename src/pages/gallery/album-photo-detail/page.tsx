import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { observer } from 'mobx-react';
import TopBar from 'components/common/TopBar/TopBar';
import BottomMenu from 'pages/gallery/components/BottomMenu/BottomMenu';
import CommentMenu from 'pages/gallery/components/CommentMenu/CommentMenu';
import Icon from 'components/common/Icon/Icon';
import {
  usePostCommentMutation,
  useDeletePhotosFromAlbumMutation,
} from 'hooks/queries';
import store from 'stores/RootStore';
import Modal from 'components/common/Modal/Modal';
import useToast from 'hooks/common/useToast';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import PhotoDetail from '../components/PhotoDetail/PhotoDetail';
import { MENT_GALLERY } from '../../../constants/ments';
import * as S from './page.styled';

const AlbumPhotoDetailPage = () => {
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

  const { mutate: deletePhotoMutate } = useDeletePhotosFromAlbumMutation({
    coupleId,
    albumId,
    options: {
      useErrorBoundary: false,
    },
  });
  const { mutate: postCommentMutate } = usePostCommentMutation({
    coupleId,
    photoId,
    options: {
      useErrorBoundary: false,
    },
  });

  const makeComment = (content: string) => {
    postCommentMutate(content, {
      onError: () => {
        addToast(MENT_GALLERY.COMMENT_POST_FAIL);
      },
    });
  };

  const deletePhotos = () => {
    if (!pId) return;
    deletePhotoMutate([pId], {
      onSuccess: () => {
        addToast(MENT_GALLERY.PHOTO_DELETE_FROM_ALBUM_SUCCESS);
        navigate(`/gallery/album/${albumId}`, {
          state: {
            title,
            subTitle,
          },
        });
      },
      onError: () => {
        addToast(MENT_GALLERY.PHOTO_DELETE_FAIL);
      },
    });
  };

  return (
    <S.Container>
      <TopBar
        title={title}
        subTitle={subTitle}
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      <S.DetailContainer>
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
          description={MENT_GALLERY.PHOTO_DELETE_FROM_ALBUM_CONFIRM}
          mainActionLabel="확인"
          onMainAction={deletePhotos}
          subActionLabel="취소"
          onSubAction={() => setOnModal(false)}
        />
      )}
    </S.Container>
  );
};

export default observer(AlbumPhotoDetailPage);
