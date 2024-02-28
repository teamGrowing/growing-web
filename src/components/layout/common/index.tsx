import styled, { css } from 'styled-components';

const fullHeight = css`
  height: 100%;
  min-height: 640px;
`;

export const LayoutWithNavbar = styled.div`
  ${fullHeight}

  padding-bottom: calc(var(--navbar-real-height));
`;

export const LayoutWithTopbar = styled.div`
  ${fullHeight}

  padding-top: calc(var(--topbar-real-height));
`;

export const LayoutWithTopbarNavbar = styled.div`
  ${fullHeight}

  padding-top: calc(var(--topbar-real-height));
  padding-bottom: calc(var(--navbar-real-height));
`;
