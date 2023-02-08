import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { observer } from 'mobx-react';
import TopBar from '../../components/common/TopBar/TopBar';
import PhotoDetail from '../../components/pages/gallery/PhotoDetail';
import BottomMenu from '../../components/pages/gallery/BottomMenu';
import CommentMenu from '../../components/pages/gallery/CommentMenu';
import Icon from '../../components/common/Icon/Icon';
import {
  useDeletePhotosMutation,
  useGalleryDetail,
} from '../../hooks/queries/gallery.queries';
import store from '../../stores/RootStore';

function AlbumPhotoDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pId: params } = useParams();
  const [commentIsVisible, setCommentIsvisible] = useState(false);
  const { data: photo } = useGalleryDetail({
    coupleId: store.userStore.user?.coupleId!,
    photoId: params ?? '',
  });
  const { mutate: deletePhotoMutate } = useDeletePhotosMutation({
    coupleId: store.userStore.user?.coupleId!,
  });
  const title = location.state.title ? location.state.title : '';
  const subTitle = location.state.subTitle ? location.state.subTitle : '';

  return (
    <>
      <TopBar
        title={title}
        subTitle={subTitle}
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigate(-1)}
      />
      {photo && <PhotoDetail photoInfo={photo} />}
      {commentIsVisible && <CommentMenu />}
      <BottomMenu
        border={!commentIsVisible}
        onComment={() => {
          setCommentIsvisible((prevState) => !prevState);
        }}
        onMessage={() => {}}
        onTrash={() => {
          if (photo?.id) deletePhotoMutate([photo?.id]);
        }}
      />
    </>
  );
}

export default observer(AlbumPhotoDetailPage);
