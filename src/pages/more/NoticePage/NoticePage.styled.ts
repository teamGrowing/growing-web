import { LayoutWithTopbar } from 'components/layout/common';
import styled from 'styled-components';

export const Container = styled(LayoutWithTopbar)`
  background: ${({ theme }) => theme.color.background};
`;

export const ListWrapper = styled.ul`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px 20px;
`;
