import { Suspense } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import Ballon from '../Ballon/Ballon';
import PetGauge from '../PetGauge/PetGauge';
import RaisingPet from '../RaisingPet/RaisingPet';
import PetLabel from '../PetLabel/PetLabel';
import * as S from './Pet.styled';

const Pet = () => {
  return (
    <S.Container>
      <ErrorBoundary FallbackComponent={Pet.Error}>
        <Suspense fallback={<Ballon.Loading />}>
          <Ballon />
        </Suspense>

        <RaisingPet />

        <Suspense fallback={<PetLabel.Loading />}>
          <PetLabel />
        </Suspense>

        <Suspense fallback={<PetGauge.Loading />}>
          <PetGauge />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
};

Pet.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.ErrorContainer>
      <S.ErrorMessage>일시적인 오류로 불러오지 못했어요.</S.ErrorMessage>
      <S.ResetButton onClick={resetErrorBoundary}>다시 불러오기</S.ResetButton>
    </S.ErrorContainer>
  );
};

export default Pet;
