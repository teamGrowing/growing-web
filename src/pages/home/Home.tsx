import React, { useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import dayjs from 'dayjs';
import store from '../../stores/RootStore';
import preventScroll from '../../util/utils';
import useCoupleData from '../../hooks/queries/couple.queries';
import HomePet from '../../components/pages/home/HomePet';

const HomeContainer = styled.div`
  padding: 49px 16px 0 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.color.purple50};

  position: relative;
`;
const Dates = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 8px 20px 8px 36px;

  color: ${({ theme }) => theme.color.gray700};
`;
const Today = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Day = styled.div`
  font-family: 'PretendardMedium';
  font-size: 40px;
`;
const YearMonth = styled.div`
  display: flex;
  flex-direction: column;
`;
const Year = styled.div`
  font-family: 'PretendardMedium';
  font-size: 23px;
`;
const Month = styled.div`
  font-family: 'PretendardRegular';
  font-size: 14px;
`;

const Dday = styled.div`
  width: max-content;
  padding: 10px 20px;
  background-image: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.2) 7.3%,
    rgba(234, 96, 96, 0.2) 100%
  );
  border-radius: 14px;
  box-shadow: 3px 3px 10px #00000025;

  font-family: 'PretendardMedium';
  font-size: 23px;
`;
const StyledName = styled.div`
  padding: 12px 26px;
  filter: drop-shadow(4px 4px 10px #0000003f);
  border-radius: 14px;

  color: ${({ theme }) => theme.color.gray700};
  font-size: 16px;
  line-height: 19px;
  text-align: end;
`;

const Shop = styled.div`
  width: 36px;
  height: 36px;
  margin: 2px 0 8px 31px;
  padding: 6px;
  /* box-shadow: 3px 3px 10px #00000033; */
  border-radius: 50%;
  /* background-color: ${({ theme }) => theme.color.white}; */
`;

function Home() {
  const { userStore } = store;
  const { data: couple } = useCoupleData({
    coupleId: userStore.user?.coupleId,
  });

  useEffect(() => {
    preventScroll();
  }, []);

  return (
    <HomeContainer className="page-container with-navbar">
      <Dates>
        <Today>
          <Day>{dayjs().format('DD')}</Day>
          <YearMonth>
            <Year>{dayjs().format('YYYY')}</Year>
            <Month>{dayjs().format('MMMM')}</Month>
          </YearMonth>
        </Today>
        <Dday>D+{`${couple?.dayCount}`}</Dday>
      </Dates>
      <StyledName>{`${couple?.myName}과 ${couple?.partnerName}💓`}</StyledName>

      {/* TODO: 아직 shop 기능이 없으므로 주석 처리함 */}
      <Shop>{/* <Icon icon="IconCart" /> */}</Shop>

      <HomePet />
    </HomeContainer>
  );
}

export default observer(Home);
