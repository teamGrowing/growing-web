import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: var(--full-width);
  margin: 0 auto;

  height: var(--full-height);

  overflow-y: scroll;
  background: ${({ theme }) => theme.color.background};
  padding-top: var(--safe-area-top);
`;

export const FixedContainer = styled.div`
  position: absolute;
  width: 100%;
  max-width: 780px;
  height: calc(var(--full-height) - 43px - 176px - 81px);
`;
