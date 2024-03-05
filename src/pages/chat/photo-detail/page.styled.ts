import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const PageContainer = styled(TopbarBackgroundContainer)`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.color.gray900};
`;

export const InnerContainer = styled(TopbarInnerContainer)``;

export const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: calc(100% - 80px);

  justify-content: center;
`;

export const Photo = styled.img`
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
`;

export const StyledSwiperSlide = styled(SwiperSlide)`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 52px;

  width: 100%;
  height: 80px;
`;
