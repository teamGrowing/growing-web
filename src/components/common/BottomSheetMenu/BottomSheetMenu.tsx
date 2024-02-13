import React from 'react';
import * as S from './BottomSheetMenu.styled';

export interface BottomSheetMenuProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

export default function BottomSheetMenu({
  children,
  onClick,
}: BottomSheetMenuProps) {
  return <S.Menu onClick={onClick}>{children}</S.Menu>;
}
