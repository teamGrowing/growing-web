import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const Container = styled(TopbarBackgroundContainer)`
  position: relative;

  justify-content: space-between;

  background: ${({ theme }) => theme.color.background};
  padding-bottom: 0;
`;

export const InnerContainer = styled(TopbarInnerContainer)``;

export const Wave = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 45px;
`;
