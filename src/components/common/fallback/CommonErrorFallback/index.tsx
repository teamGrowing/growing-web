import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import errorAnimation from 'assets/lottie/errorAnimation.json';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import * as S from './CommonErrorFallback.styled';

interface Props extends Pick<FallbackProps, 'resetErrorBoundary'> {
  content: string;
}

const CommonErrorFallback = ({ content, resetErrorBoundary }: Props) => {
  const navigation = useNavigate();

  const handleGoToHome = () => {
    navigation('/', { replace: true });
    resetErrorBoundary();
  };

  return (
    <S.FullScreen>
      <TopBar
        mode="BACKGROUND"
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={resetErrorBoundary}
        border={false}
      />

      <Lottie
        animationData={errorAnimation}
        style={{ width: '200px', marginTop: '-90px' }}
        loop={false}
      />

      <S.TextContainer>
        <S.Title>{content}</S.Title>
        <S.Text>서비스 이용에 불편을 드려 죄송합니다.</S.Text>
      </S.TextContainer>

      <S.Button onClick={handleGoToHome}>홈으로 이동</S.Button>
    </S.FullScreen>
  );
};

export default CommonErrorFallback;
