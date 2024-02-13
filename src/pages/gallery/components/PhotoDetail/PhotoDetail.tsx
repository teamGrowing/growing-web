import Video from 'pages/chat/components/ChatVideo/ChatVideo';
import { PhotoDto } from 'models/gallery';
import * as S from './PhotoDetail.styled';

type PhotoDetailProps = {
  photoInfo: PhotoDto;
};

function PhotoDetail({ photoInfo }: PhotoDetailProps) {
  const date = new Date(photoInfo.createdAt);

  return (
    <S.Scrolls>
      {!photoInfo.videoUrl && <S.Photo backgroundUrl={photoInfo.urls} />}
      {photoInfo.videoUrl && photoInfo.time && (
        <Video
          id={photoInfo.id}
          thumbnailUrl={photoInfo.urls}
          time={photoInfo.time}
          videoUrl={photoInfo.videoUrl}
          height="60%"
        />
      )}
      <S.Info>
        <S.Name>{photoInfo.name}</S.Name>
        <S.CreatedAt>{`${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}</S.CreatedAt>
      </S.Info>
    </S.Scrolls>
  );
}

export default PhotoDetail;
