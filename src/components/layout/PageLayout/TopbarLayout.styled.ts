import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  width: 100%;
  max-width: var(--full-width);
  margin: 0 auto;

  height: var(--full-height);

  display: flex;
  flex-direction: column;

  padding-bottom: var(--safe-area-bottom);
`;

export const InnerContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
`;
