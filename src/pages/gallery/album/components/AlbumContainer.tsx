import { AlbumDto } from 'models/gallery';
import { useAlbumsList, useDeleteAlbumsMutation } from 'hooks/queries';
import store from 'stores/RootStore';
import GalleryTitle from 'pages/gallery/components/GalleryTitle/GalleryTitle';
import { useNavigate } from 'react-router-dom';
import { MENT_COMMON, MENT_GALLERY } from 'constants/ments';
import useToast from 'hooks/common/useToast';
import { useState } from 'react';
import Icon from 'components/common/Icon/Icon';
import Modal from 'components/common/Modal/Modal';
import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import * as S from './AlbumContainer.styled';
import AlbumRowContainer from './AlbumRowContainer';

const makeChunk = (data: AlbumDto[]) => {
  const arr = [];
  for (let i = 0; i < data.length; i += 3) {
    arr.push(data.slice(i, i + 3));
  }
  return arr;
};

interface Props {
  selectingAvailable: boolean;
  setSelectingAvailable: React.Dispatch<boolean>;
  selectedAlbums: string[];
  clearSelectedList: () => void;
}

const AlbumContainer = ({
  selectingAvailable,
  setSelectingAvailable,
  selectedAlbums,
  clearSelectedList,
}: Props) => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [onModal, setOnModal] = useState(false);
  const coupleId = store.userStore.user?.coupleId ?? '';
  const { data: albums } = useAlbumsList({ coupleId });
  const { mutate: deleteAlbumsMutate } = useDeleteAlbumsMutation({
    coupleId,
    options: {
      onSuccess: () => {
        setSelectingAvailable(false);
        addToast(MENT_GALLERY.ALBUM_DELETE_SUCCESS);
        clearSelectedList();
      },
      onError: () => {
        addToast(MENT_GALLERY.ALBUM_DELETE_FAIL);
      },
      useErrorBoundary: false,
    },
  });

  const clickCancel = () => {
    clearSelectedList();
    setSelectingAvailable(false);
  };

  const deleteAlbums = () => {
    deleteAlbumsMutate(selectedAlbums);
    clearSelectedList();
  };

  return (
    <>
      <GalleryTitle
        title="ALBUM"
        backBtn
        onBackBtnClick={() => navigate('/gallery')}
        plusBtn={!selectingAvailable}
        onPlusBtnClick={() => navigate('/gallery/new-album')}
        rightNode={
          !selectingAvailable ? (
            <Icon icon="IconCheck" />
          ) : (
            <S.Cancel className="text-gradient400">취소</S.Cancel>
          )
        }
        onRightClick={
          selectingAvailable ? clickCancel : () => setSelectingAvailable(true)
        }
        rightSubNode={selectingAvailable && <Icon icon="IconTrash" />}
        onRightSubClick={() => {
          if (selectedAlbums.length <= 0) {
            addToast(MENT_GALLERY.ALBUM_DELETE_FAIL_NO_SELECTED);
            return;
          }
          setOnModal(true);
        }}
      />
      <S.ScrollArea className="hidden-scrollbar">
        <S.Container>
          {makeChunk(albums ?? []).map((group) => (
            <AlbumRowContainer albums={group} key={group[0].id} />
          ))}
          {albums?.length === 0 && (
            <S.MessageContainer>
              <S.Message>{MENT_GALLERY.ALBUM_EMPTY}</S.Message>
            </S.MessageContainer>
          )}
        </S.Container>
      </S.ScrollArea>
      <Modal
        onModal={onModal}
        setOnModal={setOnModal}
        description={MENT_GALLERY.ALBUM_DELETE_CONFIRM}
        mainActionLabel="확인"
        onMainAction={deleteAlbums}
        subActionLabel="취소"
        onSubAction={() => setOnModal(false)}
      />
    </>
  );
};

AlbumContainer.Loading = () => {
  return (
    <>
      <GalleryTitle backBtn title="ALBUM" />
      <S.Container>
        {makeChunk(Array(18).fill(0)).map((group) => (
          <S.FixedContainer>
            {group.map(() => (
              <Skeleton width={104} height={148} />
            ))}
          </S.FixedContainer>
        ))}
      </S.Container>
    </>
  );
};

AlbumContainer.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <GalleryTitle backBtn title="ALBUM" />
      <S.MessageContainer>
        <S.Message>{MENT_GALLERY.ALBUM_LOAD_FAIL}</S.Message>
        <S.Button onClick={resetErrorBoundary}>{MENT_COMMON.RETRY}</S.Button>
      </S.MessageContainer>
    </>
  );
};

export default AlbumContainer;
