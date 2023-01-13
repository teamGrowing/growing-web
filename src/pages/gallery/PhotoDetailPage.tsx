import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TopBar from '../../components/common/TopBar/TopBar';
import PhotoDetail from '../../components/pages/gallery/PhotoDetail';
import leftArrowIcon from '../../assets/icons/albumPage/ArrowLeft.png';
import PhotoDto from '../../types/gallery/Photo.dto';
import BottomMenu from '../../components/pages/gallery/BottomMenu';
import CommentMenu from '../../components/pages/gallery/CommentMenu';

function PhotoDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [photoInfo, setPhotoInfo] = useState<PhotoDto>();
  const [commentIsVisible, setCommentIsvisible] = useState(false);
  const title = location.state.title ? location.state.title : '';
  const subTitle = location.state.subTitle ? location.state.subTitle : '';

  useEffect(() => {
    setPhotoInfo({
      id: '1',
      url: 'https://picsum.photos/id/237/200/300',
      createdAt: '2000',
      name: 'string',
    });
  }, []);

  return (
    <>
      <TopBar
        title={title}
        subTitle={subTitle}
        leftNode={<img src={leftArrowIcon} alt="back" />}
        onLeftClick={() => {
          navigate(-1);
        }}
      />
      {photoInfo && <PhotoDetail photoInfo={photoInfo} />}
      {commentIsVisible && <CommentMenu />}
      <BottomMenu
        onComment={() => {
          setCommentIsvisible((prevState) => !prevState);
        }}
        onMessage={() => {}}
        onTrash={() => {}}
      />
    </>
  );
}

export default PhotoDetailPage;
