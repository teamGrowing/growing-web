import styled from 'styled-components';

export const FullScreen = styled.div`
  z-index: 999;
  position: fixed;

  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: var(--full-height);

  background: ${({ theme }) => theme.color.background};
  opacity: 0.9;
`;
