import styled from 'styled-components';
import { LayoutWithTopbar } from 'components/layout/common';

export const Container = styled(LayoutWithTopbar)`
  height: 100%;
  background: ${({ theme }) => theme.color.background};
`;

export const InnerContainer = styled.div`
  padding: 20px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;
