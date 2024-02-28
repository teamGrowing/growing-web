import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import * as S from './Head.styled';
import CoupleInfo from '../CoupleInfo/CoupleInfo';
import Today from '../Today/Today';

const Head = () => {
  return (
    <S.Container>
      <Today />

      <ErrorBoundary FallbackComponent={CoupleInfo.Error}>
        <Suspense fallback={<CoupleInfo.Loading />}>
          <CoupleInfo />
        </Suspense>
      </ErrorBoundary>
    </S.Container>
  );
};

export default Head;
