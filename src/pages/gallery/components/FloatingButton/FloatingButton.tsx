import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Icon from 'components/common/Icon/Icon';
import { MENT_GALLERY } from 'constants/ments';
import useToast from 'hooks/common/useToast';
import {
  useCreatePhotoMutation,
  useGetUploadUrl,
  usePostPhotosMutation,
  useUploadPhotoMutation,
} from 'hooks/queries';
import store from 'stores/RootStore';
import { getVideoDuration } from 'utils/video';
import Skeleton from 'react-loading-skeleton';
import * as S from './FloatingButton.styled';

function FloatingButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setUploadingCount] = useState(0);

  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { addToast } = useToast();
  const coupleId = store.userStore.user?.coupleId ?? '';
  const { albumId } = useParams();

  const { mutateAsync: getUploadUrl } = useGetUploadUrl({
    coupleId,
  });
  const { mutateAsync: createPhoto } = useCreatePhotoMutation({
    coupleId,
  });
  const { mutateAsync: uploadFileToUrl } = useUploadPhotoMutation();
  const { mutateAsync: addPhotosToAlbum } = usePostPhotosMutation({
    coupleId,
    albumId: albumId ?? '',
  });

  const onClickHandler = useCallback(() => {
    inputFileRef.current?.click();
  }, []);

  const upLoadFile = async () => {
    const files = inputFileRef.current?.files;

    if (!files || files.length === 0) {
      return;
    }

    setUploadingCount((count) => count + 1);

    try {
      setIsLoading(true);
      const photoUploadPromises = [...files].map(async (file) => {
        const {
          data: { url, s3Path },
        } = await getUploadUrl(file);

        await uploadFileToUrl({ file, url });

        let fileTime = null;
        if (file.type.includes('video')) {
          fileTime = await getVideoDuration(file);
        }

        const photoInfo = await createPhoto({ s3Path, time: fileTime });
        return photoInfo.data.photoId;
      });

      const uploadedPhotoIds = await Promise.all(photoUploadPromises);

      if (albumId) {
        await addPhotosToAlbum({ imageIds: uploadedPhotoIds });
      }

      addToast(MENT_GALLERY.PHOTO_UPLOAD_SUCCESS);
    } catch (e) {
      addToast(MENT_GALLERY.PHOTO_UPLOAD_FAIL);
    } finally {
      setUploadingCount((count) => {
        const newCount = count - 1;
        if (newCount === 0) {
          setIsLoading(false);
        }
        return newCount;
      });
    }
  };

  return (
    <>
      <S.ButtonStyle onClick={onClickHandler}>
        <S.Wrapper>
          <Icon icon="IconPlus" size={32} />
        </S.Wrapper>
        <S.Input
          type="file"
          accept="video/*,image/*"
          multiple
          ref={inputFileRef}
          style={{ display: 'none' }}
          onChange={upLoadFile}
        />
      </S.ButtonStyle>

      {isLoading && (
        <S.Progress>
          <Skeleton height={24} baseColor="#F38181" highlightColor="#e56969" />
          <S.ProgressMessage>사진을 업로드 중이에요.</S.ProgressMessage>
        </S.Progress>
      )}
    </>
  );
}

export default FloatingButton;
