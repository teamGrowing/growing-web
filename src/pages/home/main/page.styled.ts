import { LayoutWithNavbar } from 'components/layout/common';
import styled from 'styled-components';

export const HomeContainer = styled(LayoutWithNavbar)`
  padding-top: calc(var(--safe-area-top) + 20px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${({ theme }) => theme.color.background};

  position: relative;
`;
