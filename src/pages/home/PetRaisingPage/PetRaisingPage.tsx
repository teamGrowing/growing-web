import { useEffect } from 'react';
import preventScroll from 'utils/utils';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './PetRaisingPage.styled';
import HelpText from './components/HelpText';
import ReactivePet from './components/ReactivePet';
import { PetOption } from './types/PetOption';

export default function PetRaisingPage() {
  const navigation = useNavigate();
  const { pathname } = useLocation();
  const petOption: PetOption = pathname.split('/')[2] as PetOption;

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <S.Container>
      <TopBar
        mode="BACKGROUND"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => navigation(-1)}
        border={false}
      />

      <ReactivePet reactionType={petOption} />

      <HelpText reactionType={petOption} />
    </S.Container>
  );
}
