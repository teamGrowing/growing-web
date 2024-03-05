import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: var(--full-width);
  margin: 0 auto;
  height: 100vh;

  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  display: flex;
  flex-direction: column;
`;
