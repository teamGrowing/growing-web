import Icon from 'components/common/Icon/Icon';
import PetCardContent from 'pages/more/pet/components/PetCardContent';
import { Suspense } from 'react';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './PetDetailCard.styled';

type Props = {
  petId: string;
  onExit: React.MouseEventHandler;
};

const PetDetailCard = ({ petId, onExit }: Props) => {
  return (
    <S.Background>
      <Icon
        icon="IconExit"
        style={{
          position: 'absolute',
          width: '24px',
          height: '24px',
          left: '277px',
          top: '9px',
        }}
        onClick={onExit}
      />
      <BlockErrorBoundary fallbackComponent={PetCardContent.Error}>
        <Suspense fallback={<PetCardContent.Loading />}>
          <PetCardContent petId={petId} />
        </Suspense>
      </BlockErrorBoundary>
    </S.Background>
  );
};

export default PetDetailCard;
