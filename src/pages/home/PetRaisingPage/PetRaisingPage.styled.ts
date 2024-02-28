import styled from 'styled-components';
import { LayoutWithTopbar } from 'components/layout/common';

export const Container = styled(LayoutWithTopbar)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${({ theme }) => theme.color.background};
`;
