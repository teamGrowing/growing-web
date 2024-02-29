import { TopbarBackgroundContainer } from 'components/layout/PageLayout/TopbarLayout';
import styled from 'styled-components';

export const RootContainer = styled(TopbarBackgroundContainer)`
  background: ${({ theme }) => theme.color.background};

  padding-bottom: var(--navbar-real-height);
`;

export const Container = styled.div`
  overflow-y: scroll;

  padding: 10px 0 50px;
`;

export const Option = styled.div`
  width: 25px;
  height: 17px;

  font-family: 'PretendardMedium';
  font-size: 14px;
  line-height: 17px;

  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
