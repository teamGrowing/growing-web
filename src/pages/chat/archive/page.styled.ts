import styled from 'styled-components';
import { LayoutWithNavbar } from 'components/layout/common';

export const PageContainer = styled(LayoutWithNavbar)`
  background: ${({ theme }) => theme.color.background};

  display: flex;
  flex-direction: column;

  padding: var(--navbar-real-height) 16px 0;
`;