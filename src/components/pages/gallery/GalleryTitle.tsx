import styled from 'styled-components';
import React from 'react';
import Icon from '../../common/Icon/Icon';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  gap: 10px;

  width: 100%;
  z-index: 0;
`;

const Left = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  gap: 4px;
`;

const Right = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  padding: 0px;
  gap: 10px;

  height: 24px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Title = styled.div`
  font-family: 'PretendardMedium';
  font-size: 23px;

  flex: 1;
`;

const Div = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type GalleryTitleProps = {
  title: string;
  backBtn?: boolean;
  onBackBtnClick?: React.MouseEventHandler<SVGSVGElement>;
  plusBtn?: boolean;
  onPlusBtnClick?: React.MouseEventHandler<SVGSVGElement>;
  rightNode?: React.ReactNode;
  onRightClick?: React.MouseEventHandler<HTMLElement>;
  rightSubNode?: React.ReactNode;
  onRightSubClick?: React.MouseEventHandler<HTMLElement>;
};

function GalleryTitle({
  title,
  backBtn,
  onBackBtnClick,
  plusBtn,
  onPlusBtnClick,
  rightNode,
  onRightClick,
  rightSubNode,
  onRightSubClick,
}: GalleryTitleProps) {
  return (
    <Container>
      <Left>
        {backBtn && <Icon icon="IconArrowLeft" onClick={onBackBtnClick} />}
        <Title className="text-gradient400">{title}</Title>
      </Left>
      <Right>
        {plusBtn && <Icon icon="IconPlus" onClick={onPlusBtnClick} />}
        {rightSubNode && <Div onClick={onRightSubClick}>{rightSubNode}</Div>}
        {rightNode && <Div onClick={onRightClick}>{rightNode}</Div>}
      </Right>
    </Container>
  );
}
export default GalleryTitle;
