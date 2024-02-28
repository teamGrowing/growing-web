import { observer } from 'mobx-react';
import loadingAnimation from 'assets/lottie/loadingAnimation.json';
import { usePetData } from 'hooks/queries';
import store from 'stores/RootStore';
import * as S from './Pet.styled';

interface Props {
  reactionUrl: string | null;
  onPetClick: () => void;
}

const Pet = ({ reactionUrl, onPetClick }: Props) => {
  const { userStore } = store;

  const { data: pet } = usePetData({
    coupleId: userStore.user?.coupleId!,
    petId: userStore.petId!,
  });

  return (
    <S.Pet
      url={reactionUrl ?? (pet?.imageUrl || '')}
      size={200}
      onClick={onPetClick}
    />
  );
};

Pet.Loading = () => {
  return (
    <S.Container>
      <S.LoadingLottie animationData={loadingAnimation} loop />
    </S.Container>
  );
};

export default observer(Pet);
