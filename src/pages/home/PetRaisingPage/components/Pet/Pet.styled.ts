import styled from 'styled-components';
import Pet3DImg from 'pages/home/components/Pet3D';
import Lottie from 'lottie-react';

export const Pet = styled(Pet3DImg)`
  z-index: 1;
`;

export const Container = styled.div`
  width: 200px;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingLottie = styled(Lottie)`
  width: 100px;
`;
