import PetRaisingMenu from '../PetRaisingMenu/PetRaisingMenu';
import Pet3DImg from '../../../components/Pet3D';
import * as S from './RasingPet.styled';
import { PET_BASE_SIZE } from '../../../constants';

const RasingPet = () => {
  return (
    <S.Container>
      <Pet3DImg size={PET_BASE_SIZE} />

      <PetRaisingMenu />
    </S.Container>
  );
};

export default RasingPet;
