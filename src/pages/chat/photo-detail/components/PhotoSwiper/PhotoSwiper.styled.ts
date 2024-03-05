import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { TopbarInnerContainer } from 'components/layout/PageLayout/TopbarLayout';

export const InnerContainer = styled(TopbarInnerContainer)``;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  flex: 1;

  justify-content: center;
`;

export const Photo = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BottomBar = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px 52px;
  padding-bottom: calc(var(--safe-area-bottom) + 20px);
`;

export const SkeletonWrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  * {
    display: block;
    height: 100%;
  }
`;

export const ErrorContainer = styled(TopbarInnerContainer)`
  justify-content: center;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
`;

export const ResetButton = styled.button`
  margin: 30px;
  padding: 10px;

  background: ${({ theme }) => theme.color.gray700};
  border-radius: 30px;

  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;
