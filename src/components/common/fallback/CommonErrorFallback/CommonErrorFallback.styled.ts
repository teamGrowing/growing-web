import styled from 'styled-components';
import Lottie from 'lottie-react';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const FullScreen = styled(TopbarBackgroundContainer)`
  background: ${({ theme }) => theme.color.background};
`;

export const InnerContainer = styled(TopbarInnerContainer)`
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.section`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const Title = styled.p`
  font-family: PretendardExtraBold;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const StyledLottie = styled(Lottie)`
  width: 200px;
`;
