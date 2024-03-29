import styled from 'styled-components';
import {
  TopbarBackgroundContainer,
  TopbarInnerContainer,
} from 'components/layout/PageLayout/TopbarLayout';

export const Container = styled(TopbarBackgroundContainer)`
  position: relative;
  background: ${({ theme }) => theme.color.background};
`;

export const DetailContainer = styled(TopbarInnerContainer)`
  position: relative;
`;
