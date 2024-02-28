import styled from 'styled-components';
import { LayoutWithNavbar } from 'components/layout/common';

export const PageContainer = styled(LayoutWithNavbar)`
  background: ${({ theme }) => theme.color.background};

  overflow-y: hidden;

  display: flex;
  flex-direction: column;
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

  padding: 16px 16px 32px;

  height: 100%;
  overflow-y: scroll;
`;

export const EmptyCase = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;

  font-family: 'PretendardMedium';
  font-size: 19px;
`;
