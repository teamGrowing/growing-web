import styled, { css } from 'styled-components';
import { TopBarMode } from './types/TopBarMode';

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

export const Container = styled.header<{ mode: TopBarMode; border: boolean }>`
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
  height: calc(constant(safe-area-inset-top) + var(--topbar-height));
  height: calc(env(safe-area-inset-top) + var(--topbar-height));
  padding: 0 4px;
  padding-top: calc(constant(safe-area-inset-top));
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

export const LeftNode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 48px;
  width: 48px;
  height: 100%;
`;

export const Center = styled.div`
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

export const Title = styled.div<{ mode: TopBarMode; hasSubTitle: boolean }>`
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

export const SubTitle = styled.div<{ mode: TopBarMode }>`
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

export const RightMainNode = styled.div<{ mode: TopBarMode }>`
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

export const RightSubNode = styled(RightMainNode)`
  right: 52px;
`;
