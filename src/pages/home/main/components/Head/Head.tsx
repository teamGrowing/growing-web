import { Suspense } from 'react';
import BlockErrorBoundary from 'components/common/fallback/BlockErrorBoundary/BlockErrorBoundary';
import * as S from './Head.styled';
import CoupleInfo from '../CoupleInfo/CoupleInfo';
import Today from '../Today/Today';

const Head = () => {
  return (
    <S.Container>
      <Today />

      <BlockErrorBoundary fallbackComponent={CoupleInfo.Error}>
        <Suspense fallback={<CoupleInfo.Loading />}>
          <CoupleInfo />
        </Suspense>
      </BlockErrorBoundary>
    </S.Container>
  );
};

export default Head;
