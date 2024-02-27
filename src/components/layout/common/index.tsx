import styled from 'styled-components';

export const LayoutWithNavbar = styled.div`
  height: 100%;

  padding-bottom: calc(var(--navbar-real-height));
`;

export const LayoutWithTopbarNavbar = styled.div`
  height: 100%;

  padding-top: calc(var(--topbar-real-height));
  padding-bottom: calc(var(--navbar-real-height));
`;
