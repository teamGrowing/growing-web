import React from 'react';
import styled from 'styled-components';

export interface TopBarProps {
  leftNode?: React.ReactNode;
  onLeftClick?: (
    event: React.MouseEvent<HTMLElement | SVGSVGElement, MouseEvent>
  ) => void;
  title?: string;
  subTitle?: string;
  rightMainNode?: React.ReactNode;
  onRightMainClick?: (
    event: React.MouseEvent<HTMLElement | SVGSVGElement, MouseEvent>
  ) => void;
  rightSubNode?: React.ReactNode;
  onRightSubClick?: (
    event: React.MouseEvent<HTMLElement | SVGSVGElement, MouseEvent>
  ) => void;
  border?: boolean;
}

const Container = styled.div<{ border: boolean }>`
  position: relative;
  background-color: ${({ theme }) => theme.color.white};
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 48px;
  border-bottom: ${(props) =>
    props.border ? `1px solid ${props.theme.color.gray200}` : 'none'};
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
  margin-right: 48px;
  padding: 0 48px;
  width: calc(100% - 96px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;
const Title = styled.div<{ hasSubTitle: boolean }>`
  width: 100%;
  font-size: ${({ hasSubTitle }) => (hasSubTitle ? '14px' : '16px')};
  line-height: ${({ hasSubTitle }) => (hasSubTitle ? '17px' : '19px')};
  text-align: center;
  /* text gradient */
  background: ${({ theme }) => theme.color.gradient400};
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  /* text overflow */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SubTitle = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.color.gray900};
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const RightMainNode = styled.div`
  position: absolute;
  right: 4px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  & > div {
    font-size: 14px;
    line-height: 17px;
    background: ${({ theme }) => theme.color.gradient400};
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
  }
`;
const RightSubNode = styled(RightMainNode)`
  right: 52px;
`;

export default function TopBar({
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
    <Container border={border as boolean}>
      <LeftNode onClick={onLeftClick}>{leftNode}</LeftNode>
      <Center>
        {title && <Title hasSubTitle={!!subTitle}>{title}</Title>}
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
      </Center>
      <RightSubNode onClick={onRightSubClick}>{rightSubNode}</RightSubNode>
      <RightMainNode onClick={onRightMainClick}>{rightMainNode}</RightMainNode>
    </Container>
  );
}

TopBar.defaultProps = {
  border: true,
};
