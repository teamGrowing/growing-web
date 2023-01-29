import styled from 'styled-components';

const PurpleBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  z-index: -10;
  background-color: ${({ theme }) => theme.color.purple50};
`;
export default PurpleBackground;
