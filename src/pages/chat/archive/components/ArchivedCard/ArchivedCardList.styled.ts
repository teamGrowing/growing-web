import styled from 'styled-components';
import { LayoutWithNavbar } from 'components/layout/common';

export const PageContainer = styled(LayoutWithNavbar)`
  background: ${({ theme }) => theme.color.background};

  display: flex;
  flex-direction: column;

  padding: var(--navbar-real-height) 16px 0;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 150px;
  grid-gap: 16px;
  justify-items: center;

  > :nth-child(2n + 1) {
    grid-row: span 2;
  }

  height: 100%;
  overflow-y: scroll;
`;
