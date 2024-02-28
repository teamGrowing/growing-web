import styled from 'styled-components';
import Pet3DImg from 'pages/home/components/Pet3D';
import Lottie from 'lottie-react';

export const PetContainer = styled.section`
  position: relative;

  display: flex;
  align-items: flex-end;

  padding: 0 30px;
`;

export const Pet = styled(Pet3DImg)`
  margin-bottom: 10px;
  z-index: 1;
`;

export const FoodLottie = styled(Lottie)`
  width: 120px;
  margin-right: -20px;
`;

export const HearLottie = styled(Lottie)`
  width: 80px;
  position: absolute;
  top: 50%;
  left: calc(50% + 110px);
  transform: translate3d(-50%, -140px, 0);
`;
