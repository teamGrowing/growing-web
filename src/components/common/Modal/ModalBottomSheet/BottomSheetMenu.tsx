import React from 'react';
import styled from 'styled-components';

export interface BottomSheetMenuProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler;
}

const Menu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  font-family: 'PretendardRegular';
  font-size: 16px;
`;

export default function BottomSheetMenu({
  children,
  onClick,
}: BottomSheetMenuProps) {
  return <Menu onClick={onClick}>{children}</Menu>;
}
