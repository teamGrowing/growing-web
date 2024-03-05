import styled from 'styled-components';
import { clickPulse } from 'styles/common/animation';
import backgroundImg from 'assets/image/DetailCardBackground.png';

export const Background = styled.div`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 175px;
  width: 308px;
  height: 460px;
  background-image: url(${backgroundImg});
  background-size: contain;
  border-radius: 20px 20px 0px 0px;

  animation: 0.5s ${clickPulse};
`;
