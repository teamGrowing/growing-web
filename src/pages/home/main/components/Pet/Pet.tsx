import { Suspense } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { BlockErrorFallback } from 'components/common/fallback/BlockErrorBoundary/BlockErrorFallback';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import Ballon from '../Ballon/Ballon';
import PetGauge from '../PetGauge/PetGauge';
import RaisingPet from '../RaisingPet/RaisingPet';
import PetLabel from '../PetLabel/PetLabel';
import * as S from './Pet.styled';

const Pet = () => {
  return (
    <S.Container>
      <BlockErrorBoundary fallbackComponent={Pet.Error}>
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
      </BlockErrorBoundary>
    </S.Container>
  );
};

Pet.Error = (props: FallbackProps) => {
  return (
    <BlockErrorFallback.Common containerStyle={{ height: '90%' }} {...props} />
  );
};

export default Pet;
