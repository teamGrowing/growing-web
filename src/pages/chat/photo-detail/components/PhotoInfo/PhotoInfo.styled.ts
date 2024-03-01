import styled from 'styled-components';

export const LoadingContainer = styled.section`
  z-index: 10;
  position: sticky;
  top: 0;

  width: 100%;
  max-width: 780px;
  height: var(--topbar-real-height);

  padding: 0 4px;
  padding-top: calc(var(--safe-area-top) + 8px);

  text-align: center;
`;
