import styled from 'styled-components';

export const FullScreen = styled.div`
  z-index: 999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.color.white};
  opacity: 0.9;
  display: flex;
  align-items: center;
  justify-content: center;
`;
