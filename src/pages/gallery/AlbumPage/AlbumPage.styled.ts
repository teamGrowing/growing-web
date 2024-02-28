import styled from 'styled-components';
import { LayoutWithNavbar } from 'components/layout/common';

export const Container = styled(LayoutWithNavbar)`
  position: relative;
  background: ${({ theme }) => theme.color.background};
`;
