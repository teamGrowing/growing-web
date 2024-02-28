import { useGraduatedPets } from 'hooks/queries';
import PetCard from 'pages/more/components/PetCard/PetCard';
import Skeleton from 'react-loading-skeleton';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import changeEmojiToSpan from 'utils/Text';
import { MENT_MORE } from 'constants/ments';
import Icon from 'components/common/Icon/Icon';
import { FallbackProps } from 'react-error-boundary';
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

      {data?.map((pet) => (
        <PetCard key={pet.id} petInfo={pet} onClick={clickCardHandler} />
      ))}
    </>
  );
};

PetCardList.Loading = () => {
  return (
    <>
      <Skeleton width={154} height={205} borderRadius={20} />
      <Skeleton width={154} height={205} borderRadius={20} />
      <Skeleton width={154} height={205} borderRadius={20} />
      <Skeleton width={154} height={205} borderRadius={20} />
    </>
  );
};

PetCardList.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <S.ErrorMessage>일시적인 오류로 불러오지 못했어요.</S.ErrorMessage>
      <S.Button onClick={resetErrorBoundary}>다시 불러오기</S.Button>
    </S.ErrorContainer>
  );
};

export default observer(PetCardList);
