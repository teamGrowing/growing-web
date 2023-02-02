import styled from 'styled-components';
import React from 'react';
import Icon from '../../common/Icon/Icon';

const Container = styled.div<{ top: string; left: string }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  isolation: isolate;
  position: fixed;
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  width: 100%;
  height: 43px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const TitleOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  gap: 10px;

  width: 100%;
  height: 43px;

  flex: none;
  order: 0;
  flex-grow: 0;
  z-index: 0;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;

  height: 27px;

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 10px;

  height: 24px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Title = styled.div`
  width: 79px;
  height: 27px;

  font-family: 'PretendardMedium';
  font-size: 23px;
  line-height: 27px;
  display: flex;
  align-items: center;

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BackBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 2px;

  position: absolute;
  width: 43px;
  height: 43px;
  left: 0px;
  top: 0px;
`;

const Block = styled.div`
  width: 12px;
  height: 100%;
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
  top: string;
  left: string;
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
  top,
  left,
}: GalleryTitleProps) {
  return (
    <Container top={top} left={left}>
      <TitleOption>
        {backBtn && (
          <BackBtn>
            <Icon icon="IconArrowLeft" onClick={onBackBtnClick} />
          </BackBtn>
        )}
        <Left>
          {backBtn && <Block />}
          <Title className="text-gradient400">{title}</Title>
          {plusBtn && <Icon icon="IconPlus" onClick={onPlusBtnClick} />}
        </Left>
        <Right>
          {rightSubNode && <Div onClick={onRightSubClick}>{rightSubNode}</Div>}
          {rightNode && <Div onClick={onRightClick}>{rightNode}</Div>}
        </Right>
      </TitleOption>
    </Container>
  );
}
export default GalleryTitle;
