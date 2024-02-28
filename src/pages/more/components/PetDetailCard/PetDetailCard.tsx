import Icon from 'components/common/Icon/Icon';
import PetCardContent from 'pages/more/PetPage/components/PetCardContent';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import * as S from './PetDetailCard.styled';

type PetDetailCardProps = {
  petId: string;
  onExit: React.MouseEventHandler;
};

function PetDetailCard({ petId, onExit }: PetDetailCardProps) {
  const { reset } = useQueryErrorResetBoundary();

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
      <ErrorBoundary onReset={reset} FallbackComponent={PetCardContent.Error}>
        <Suspense fallback={<PetCardContent.Loading />}>
          <PetCardContent petId={petId} />
        </Suspense>
      </ErrorBoundary>
    </S.Background>
  );
}

export default PetDetailCard;
