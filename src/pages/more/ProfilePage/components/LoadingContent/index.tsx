import Lottie from 'lottie-react';
import loadingAnimation from 'assets/lottie/loadingAnimation.json';
import * as S from './LoadingContent';

const LoadingContent = () => {
  return (
    <S.Container>
      <Lottie animationData={loadingAnimation} style={{ width: '60px' }} loop />
      프로필 변경 중
    </S.Container>
  );
};

export default LoadingContent;
