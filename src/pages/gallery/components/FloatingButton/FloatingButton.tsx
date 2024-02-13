import  { useRef } from 'react';
import Icon from 'components/common/Icon/Icon';
import { MENT_GALLERY } from 'constants/ments';
import useToast from 'hooks/common/useToast';
import { useCreatePhotosMutation, usePostPhotosMutation } from 'hooks/queries';
import store from 'stores/RootStore';
import * as S from "./FloatingButton.styled";


type FloatingButtonType = {
  albumId?: string;
};

function FloatingButton({ albumId }: FloatingButtonType) {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { addToast } = useToast();
  const coupleId = store.userStore.user?.coupleId ?? '';
  const { mutate: upLoadPhotos } = useCreatePhotosMutation({
    coupleId,
  });
  const { mutate: addPhotosToAlbumMutate } = usePostPhotosMutation({
    coupleId,
    albumId: albumId ?? '',
  });

  const onClickHandler = () => {
    inputFileRef.current?.click();
  };

  const upLoadFile = () => {
    if (!inputFileRef.current?.files) return;

    upLoadPhotos(inputFileRef.current?.files, {
      onSuccess: async (data) => {
        addToast(MENT_GALLERY.PHOTO_UPLOAD_SUCCESS);
        if (albumId) {
          const ids = [];
          for (let i = 0; i < data.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            ids.push((await data[i]).photoId);
          }
          addPhotosToAlbumMutate({ imageIds: ids });
        }
        if (!inputFileRef?.current?.value) return;
        inputFileRef.current.value = '';
      },
    });
  };

  return (
    <S.ButtonStyle onClick={onClickHandler}>
      <S.Wrapper>
        <Icon icon="IconPlus" size={32} />
      </S.Wrapper>
      {/* TODO 파일 확장자 체크 */}
      <input
        type="file"
        accept="video/*,image/*"
        multiple
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={upLoadFile}
      />
    </S.ButtonStyle>
  );
}

export default FloatingButton;
