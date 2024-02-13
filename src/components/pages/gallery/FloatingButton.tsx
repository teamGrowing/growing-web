import React, { useRef } from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon/Icon';
import { MENT_GALLERY } from 'constants/ments';
import useToast from 'hooks/common/useToast';
import { useCreatePhotosMutation, usePostPhotosMutation } from 'hooks/queries';
import store from 'stores/RootStore';

const ButtonStyle = styled.div`
  position: fixed;
  right: 28px;
  bottom: 48px;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
`;

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
    <ButtonStyle onClick={onClickHandler}>
      <Wrapper>
        <Icon icon="IconPlus" size={32} />
      </Wrapper>
      {/* TODO 파일 확장자 체크 */}
      <input
        type="file"
        accept="video/*,image/*"
        multiple
        ref={inputFileRef}
        style={{ display: 'none' }}
        onChange={upLoadFile}
      />
    </ButtonStyle>
  );
}

export default FloatingButton;
