import styled from 'styled-components';
import Pet3DImg from 'pages/home/components/Pet3D';
import Lottie from 'lottie-react';

export const PetContainer = styled.section`
  flex: 1;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: flex-end;

  padding: 10px 30px 20px;
`;

export const Pet = styled(Pet3DImg)`
  z-index: 1;
`;

export const FoodLottie = styled(Lottie)`
  width: 120px;
  margin-right: -20px;
`;

export const HearLottie = styled(Lottie)`
  position: absolute;
  top: 50%;
  left: calc(50% + 110px);
  transform: translate3d(-50%, -140px, 0);

  width: 80px;
`;

export const LoadingContainer = styled.section`
  flex: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px 30px 20px;
`;

export const LoadingPetContainer = styled.div`
  width: 200px;
  height: 200px;
`;
