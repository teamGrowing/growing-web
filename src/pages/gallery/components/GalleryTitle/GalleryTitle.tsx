import React from 'react';
import Icon from 'components/common/Icon/Icon';
import * as S from './GalleryTitle.styled';

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
    <S.Container>
      <S.Left>
        {backBtn && <Icon icon="IconArrowLeft" onClick={onBackBtnClick} />}
        <S.Title className="text-gradient400">{title}</S.Title>
      </S.Left>
      <S.Right>
        {plusBtn && <Icon icon="IconPlus" onClick={onPlusBtnClick} />}
        {rightSubNode && (
          <S.Div onClick={onRightSubClick}>{rightSubNode}</S.Div>
        )}
        {rightNode && <S.Div onClick={onRightClick}>{rightNode}</S.Div>}
      </S.Right>
    </S.Container>
  );
}
export default GalleryTitle;
