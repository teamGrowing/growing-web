import React, { CSSProperties } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { MENT_COMMON } from 'constants/ments';
import Icon, { IconProps } from 'components/common/Icon/Icon';
import { ErrorMessage, ResetButton } from '../Common';
import * as S from './BlockErrorFallback.styled';

interface CommonProps extends FallbackProps {
  errorMessage?: string;
  containerStyle?: CSSProperties;
}

interface BasicProps extends CommonProps {
  head?: React.ReactNode;
}

const CommonErrorFallback = ({
  head,
  errorMessage,
  resetErrorBoundary,
  containerStyle,
}: BasicProps) => {
  return (
    <>
      {head}
      <S.RootContainer style={containerStyle}>
        <ErrorMessage>{errorMessage || MENT_COMMON.ERROR}</ErrorMessage>
        <ResetButton onClick={resetErrorBoundary}>
          {MENT_COMMON.RETRY}
        </ResetButton>
      </S.RootContainer>
    </>
  );
};

interface IconFallbackProps extends CommonProps {
  size?: IconProps['size'];
  themeColor?: IconProps['themeColor'];
}

const IconErrorFallback = ({
  resetErrorBoundary,
  errorMessage,
  size,
  themeColor,
  containerStyle,
}: IconFallbackProps) => {
  return (
    <S.RootContainer style={containerStyle}>
      <Icon
        icon="IconRefresh"
        size={size}
        themeColor={themeColor}
        onClick={resetErrorBoundary}
      />
      <ErrorMessage>{errorMessage || MENT_COMMON.ERROR}</ErrorMessage>
    </S.RootContainer>
  );
};

export const BlockErrorFallback = {
  Common: CommonErrorFallback,
  Icon: IconErrorFallback,
};
