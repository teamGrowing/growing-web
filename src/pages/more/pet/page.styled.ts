import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const Container = styled(TopbarBackgroundContainer)`
  position: relative;
  background: ${({ theme }) => theme.color.background};
`;

export const Wrapper = styled(TopbarInnerContainer)`
  width: 100%;
  flex-wrap: wrap;

  gap: 30px;
`;

export const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); ;
`;
