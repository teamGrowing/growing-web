import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import errorAnimation from 'assets/lottie/errorAnimation.json';
import Icon from 'components/common/Icon/Icon';
import TopBar from 'components/common/TopBar/TopBar';
import * as S from './CommonErrorFallback.styled';
import { ErrorMessage, ResetButton } from '../Common';

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
        onLeftClick={() => {
          resetErrorBoundary();
        }}
        border={false}
      />

      <S.InnerContainer className="hidden-scrollbar">
        <S.StyledLottie animationData={errorAnimation} loop={false} />

        <S.TextContainer>
          <S.Title>{content}</S.Title>
          <ErrorMessage>서비스 이용에 불편을 드려 죄송합니다.</ErrorMessage>
        </S.TextContainer>

        <ResetButton onClick={handleGoToHome}>홈으로 이동</ResetButton>
      </S.InnerContainer>
    </S.FullScreen>
  );
};

export default CommonErrorFallback;
