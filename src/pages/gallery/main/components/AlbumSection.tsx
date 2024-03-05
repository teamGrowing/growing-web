import { useAlbumsList } from 'hooks/queries';
import store from 'stores/RootStore';
import { FallbackProps } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/common/Icon/Icon';
import { observer } from 'mobx-react';
import { MENT_GALLERY } from 'constants/ments';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import Album from '../../components/Album/Album';
import * as S from './AlbumSection.styled';
import GalleryTitle from '../../components/GalleryTitle/GalleryTitle';

interface Props {
  onClick?: React.MouseEventHandler;
  onTouchStart?: React.TouchEventHandler;
  onTouchMove?: React.TouchEventHandler;
}

const AlbumSection = ({ onClick, onTouchStart, onTouchMove }: Props) => {
  const navigate = useNavigate();
  const { data: albums } = useAlbumsList({
    coupleId: store.userStore.user?.coupleId ?? '',
  });

  return (
    <>
      <GalleryTitle
        title="ALBUM"
        plusBtn
        onPlusBtnClick={() => navigate('new-album')}
        rightNode={(albums ?? []).length > 0 && <Icon icon="IconCheck" />}
        onRightClick={() =>
          navigate('album', { state: { selectingAvailable: true } })
        }
      />
      <S.Container
        onClick={onClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        className="hidden-scrollbar"
      >
        {albums?.length === 0 && (
          <S.NoAlbumContainer>
            <S.Line />
            <p>소중한 추억을 만들어보세요.</p>
          </S.NoAlbumContainer>
        )}
        {albums && albums?.length > 0 && (
          <>
            <S.Line />
            {albums?.map((item) => (
              <Album key={item.id} albumInfo={item} />
            ))}
          </>
        )}
      </S.Container>
    </>
  );
};

AlbumSection.Loading = () => {
  return (
    <>
      <GalleryTitle title="ALBUM" />
      <S.FixedContainer>
        <S.Line />
        <Skeleton width={104} height={148} />
        <Skeleton width={104} height={148} />
        <Skeleton width={104} height={148} />
        <Skeleton width={104} height={148} />
        <Skeleton width={104} height={148} />
        <Skeleton width={104} height={148} />
        <Skeleton width={104} height={148} />
      </S.FixedContainer>
    </>
  );
};

AlbumSection.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <GalleryTitle title="ALBUM" />
      <S.Container className="hidden-scrollbar">
        <BlockErrorFallback.Common
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          errorMessage={MENT_GALLERY.ALBUM_LOAD_FAIL}
          containerStyle={{
            paddingTop: '10px',
            width: '100%',
            justifyContent: 'center',
          }}
        />
      </S.Container>
    </>
  );
};

export default observer(AlbumSection);
