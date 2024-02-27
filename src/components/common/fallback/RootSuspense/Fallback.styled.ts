import styled from 'styled-components';

export const FullScreen = styled.div`
  z-index: 999;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.color.white};
  opacity: 0.9;
`;
