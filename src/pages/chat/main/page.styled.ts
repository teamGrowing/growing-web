import styled from 'styled-components';
import { TopbarBackgroundContainer } from 'components/layout/PageLayout/TopbarLayout';

export const ChattingPageContainer = styled(TopbarBackgroundContainer)`
  background-color: ${({ theme }) => theme.color.gray50};
`;
