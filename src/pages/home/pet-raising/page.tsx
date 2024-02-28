import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './page.styled';
import Guide from './components/Guide/Guide';
import ReactivePet from './components/PetInteractor/PetInteractor';
import { PetOption } from './types';

export default function PetRaisingPage() {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const petOption: PetOption = pathname.split('/')[3] as PetOption;

  return (
    <S.Container>
      <TopBar
        mode="BACKGROUND"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
        border={false}
      />

      <ReactivePet reactionType={petOption} />

      <Guide reactionType={petOption} />
    </S.Container>
  );
}
