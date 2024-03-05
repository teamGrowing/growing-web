import Lottie from 'lottie-react';
import loadingAnimation from 'assets/lottie/loadingAnimation.json';
import * as S from './Fallback.styled';

const Fallback = () => {
  return (
    <S.FullScreen>
      <Lottie
        animationData={loadingAnimation}
        style={{ width: '120px', marginTop: '-90px' }}
        loop
      />
    </S.FullScreen>
  );
};

export default Fallback;
