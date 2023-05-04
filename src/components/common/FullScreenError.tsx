import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';
import errorAnimation from 'assets/lottie/errorAnimation.json';
import TopBar from './TopBar/TopBar';
import Icon from './Icon/Icon';

const FullScreen = styled.div`
  z-index: 999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.color.white};
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TextContainer = styled.section`
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;
const Title = styled.p`
  font-family: PretendardExtraBold;
  font-size: 20px;
  line-height: 29px;
  text-align: center;
  background: linear-gradient(130.11deg, #7117ea 7.3%, #ea6060 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
const Text = styled.p`
  font-family: PretendardRegular;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray900};
`;
const Button = styled.button`
  margin: 30px;
  padding: 10px;
  background: ${({ theme }) => `${theme.color.purple400}80`};
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: PretendardRegular;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.purple900};
  &:hover {
    background: ${({ theme }) => `${theme.color.purple500}80`};
  }
  &:active {
    background: ${({ theme }) => `${theme.color.purple600}80`};
  }
`;

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
    <FullScreen>
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
      <TextContainer>
        <Title>에러가 발생했습니다.</Title>
        <Text>서비스 이용에 불편을 드려 죄송합니다.</Text>
      </TextContainer>
      <Button
        onClick={() => {
          navigation('/', { replace: true });
          resetErrorBoundary();
        }}
      >
        홈으로 이동
      </Button>
    </FullScreen>
  );
}
