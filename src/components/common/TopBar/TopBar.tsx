import React from 'react';
import styled, { css } from 'styled-components';

type TopBarMode = 'LIGHT' | 'DARK' | 'PURPLE50';

export interface TopBarProps {
  mode?: TopBarMode;
  leftNode?: React.ReactNode;
  onLeftClick?: () => void;
  title?: string;
  subTitle?: string;
  rightMainNode?: React.ReactNode;
  onRightMainClick?: () => void;
  rightSubNode?: React.ReactNode;
  onRightSubClick?: () => void;
  border?: boolean;
}

const Container = styled.header<{ mode: TopBarMode; border: boolean }>`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 780px;
  height: calc(constants(safe-area-inset-top) + var(--topbar-height));
  height: calc(env(safe-area-inset-top) + var(--topbar-height));
  padding: 0 4px;
  padding-top: calc(env(safe-area-inset-top));

  border-bottom: ${(props) =>
    props.border ? `1px solid ${props.theme.color.gray200}` : 'none'};
  ${({ mode }) => {
    switch (mode) {
      case 'DARK':
        return css`
          background-color: ${({ theme }) => theme.color.gray900};
        `;
      case 'PURPLE50':
        return css`
          background-color: ${({ theme }) => theme.color.purple50};
        `;
      default:
        return css`
          background-color: ${({ theme }) => theme.color.white};
        `;
    }
  }}
`;
const LeftNode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 48px;
  width: 48px;
  height: 100%;
`;
const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;

  margin-right: 48px;
  padding: 0 48px;
  width: calc(100% - 96px);
  height: 100%;
`;
const Title = styled.div<{ mode: TopBarMode; hasSubTitle: boolean }>`
  width: 100%;

  font-family: 'PretendardMedium';
  font-size: ${({ hasSubTitle }) => (hasSubTitle ? '14px' : '16px')};
  line-height: ${({ hasSubTitle }) => (hasSubTitle ? '17px' : '19px')};
  text-align: center;
  ${({ mode }) => {
    switch (mode) {
      case 'DARK':
        return css`
          color: ${({ theme }) => theme.color.white};
        `;
      default:
        return css`
          /* text gradient */
          background: ${({ theme }) => theme.color.gradient400};
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        `;
    }
  }}
`;
const SubTitle = styled.div<{ mode: TopBarMode }>`
  width: 100%;

  font-size: 12px;
  line-height: 14px;
  text-align: center;

  ${({ mode }) => {
    switch (mode) {
      case 'DARK':
        return css`
          color: ${({ theme }) => theme.color.white};
        `;
      default:
        return css`
          color: ${({ theme }) => theme.color.gray900};
        `;
    }
  }}
`;
const RightMainNode = styled.div<{ mode: TopBarMode }>`
  position: absolute;
  right: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 48px;
  height: 100%;
  > * {
    font-size: 14px;
    line-height: 17px;
    ${({ mode }) => {
      switch (mode) {
        case 'DARK':
          return css`
            color: ${({ theme }) => theme.color.white};
          `;
        default:
          return css`
            background: ${({ theme }) => theme.color.gradient400};
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
          `;
      }
    }}
  }
`;
const RightSubNode = styled(RightMainNode)`
  right: 52px;
`;

export default function TopBar({
  mode,
  leftNode,
  onLeftClick,
  title,
  subTitle,
  rightMainNode,
  onRightMainClick,
  rightSubNode,
  onRightSubClick,
  border,
}: TopBarProps) {
  return (
    <Container mode={mode as TopBarMode} border={border as boolean}>
      <LeftNode onClick={onLeftClick}>{leftNode}</LeftNode>
      <Center>
        {title && (
          <Title
            className="text-ellipsis"
            mode={mode as TopBarMode}
            hasSubTitle={!!subTitle}
          >
            {title}
          </Title>
        )}
        {subTitle && (
          <SubTitle className="text-ellipsis" mode={mode as TopBarMode}>
            {subTitle}
          </SubTitle>
        )}
      </Center>
      <RightSubNode mode={mode as TopBarMode} onClick={onRightSubClick}>
        {rightSubNode}
      </RightSubNode>
      <RightMainNode mode={mode as TopBarMode} onClick={onRightMainClick}>
        {rightMainNode}
      </RightMainNode>
    </Container>
  );
}

TopBar.defaultProps = {
  mode: 'LIGHT',
  border: true,
};
