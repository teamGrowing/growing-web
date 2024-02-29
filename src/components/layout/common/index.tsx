import styled, { css } from 'styled-components';

const fullHeight = css`
  height: var(--full-height);
  min-height: 640px;
`;

export const LayoutWithNavbar = styled.div`
  ${fullHeight}

  padding-bottom: calc(var(--navbar-real-height));
`;
