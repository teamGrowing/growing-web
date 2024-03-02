import { useGraduatedPets } from 'hooks/queries';
import PetCard from 'pages/more/components/PetCard/PetCard';
import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import changeEmojiToSpan from 'utils/Text';
import { MENT_MORE } from 'constants/ments';
import Icon from 'components/common/Icon/Icon';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import * as S from './PetCardList.styled';

interface Props {
  clickCardHandler: (petId: string) => void;
}

const PetCardList = ({ clickCardHandler }: Props) => {
  const { data } = useGraduatedPets({
    coupleId: store.userStore.user?.coupleId!,
  });

  return (
    <>
      {data?.length === 0 && (
        <S.EmptyWrapper>
          <Icon icon="IconLogo" size={60} />
          <S.Message>
            <S.FontSpan
              className="text-gradient400"
              dangerouslySetInnerHTML={changeEmojiToSpan(
                MENT_MORE.PET_NOT_EXIST
              )}
            />
          </S.Message>
        </S.EmptyWrapper>
      )}

      <S.ListWrapper>
        {data?.map((pet) => (
          <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
        ))}
      </S.ListWrapper>
    </>
  );
};

PetCardList.Loading = () => {
  return (
    <S.ListWrapper noScroll>
      {new Array(20).fill(0).map((_, i) => (
        <Skeleton width={154} height={205} borderRadius={20} key={i} />
      ))}
    </S.ListWrapper>
  );
};

PetCardList.Error = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <BlockErrorFallback.Common
      error={error}
      resetErrorBoundary={resetErrorBoundary}
      containerStyle={{ height: '100%' }}
    />
  );
};

export default observer(PetCardList);
