import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import store from 'stores/RootStore';
import preventScroll from 'util/utils';
import { useCoupleData } from 'hooks/queries';
import HomePet from 'components/pages/home/HomePet';
import * as S from './HomePage.styled';

function HomePage() {
  const { userStore } = store;
  const { data: couple } = useCoupleData({
    coupleId: userStore.user?.coupleId ?? '',
    options: {
      suspense: false,
    },
  });

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <S.HomeContainer className="page-container with-navbar">
      <S.Dates>
        <S.Today>
          <S.Day>{dayjs().format('DD')}</S.Day>
          <S.YearMonth>
            <S.Year>{dayjs().format('YYYY')}</S.Year>
            <S.Month>{dayjs().format('MMMM')}</S.Month>
          </S.YearMonth>
        </S.Today>
        <S.Dday>D+{`${couple?.dayCount}`}</S.Dday>
      </S.Dates>
      <S.StyledName>{`${couple?.myName}과 ${couple?.partnerName}💓`}</S.StyledName>

      {/* TODO: 아직 shop 기능이 없으므로 주석 처리함 */}
      <S.Shop>{/* <Icon icon="IconCart" /> */}</S.Shop>

      <HomePet />
    </S.HomeContainer>
  );
}

export default observer(HomePage);
