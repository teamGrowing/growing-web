import PetRaisingMenu from '../PetRaisingMenu';
import Pet3DImg from '../../../components/Pet3D';
import * as S from './RasingPet.styled';
import EMOJI_SIZE from '../../../constants/HomeConstants';

const RasingPet = () => {
  return (
    <S.Container>
      <Pet3DImg size={EMOJI_SIZE} />

      <PetRaisingMenu />
    </S.Container>
  );
};

export default RasingPet;
