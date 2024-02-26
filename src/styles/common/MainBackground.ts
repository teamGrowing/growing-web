import styled from 'styled-components';

const MainBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: -10;
  background: ${({ theme }) => theme.color.background};
`;

export default MainBackground;
