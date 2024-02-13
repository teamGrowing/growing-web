import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';
import errorAnimation from 'assets/lottie/errorAnimation.json';
import TopBar from '../TopBar/TopBar';
import Icon from '../Icon/Icon';
import * as S from './FullScreenError.styled';

export default function FullScreenError({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const navigation = useNavigate();

  useEffect(() => {
    // TODO: error 처리
    console.warn(error);
  }, []);

  return (
    <S.FullScreen>
      <TopBar
        leftNode={<Icon icon="IconArrowLeft" />}
        onLeftClick={() => {
          navigation('/', { replace: true }); // TODO
          resetErrorBoundary();
        }}
        border={false}
      />
      <Lottie
        animationData={errorAnimation}
        style={{ width: '200px', marginTop: '-90px' }}
        loop={false}
      />
      <S.TextContainer>
        <S.Title>에러가 발생했습니다.</S.Title>
        <S.Text>서비스 이용에 불편을 드려 죄송합니다.</S.Text>
      </S.TextContainer>
      <S.Button
        onClick={() => {
          navigation('/', { replace: true });
          resetErrorBoundary();
        }}
      >
        홈으로 이동
      </S.Button>
    </S.FullScreen>
  );
}
