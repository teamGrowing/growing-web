import React from 'react';
import * as S from './ToolbarBottomSheet.styled';

interface ToolbarBottomSheetProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function ToolbarBottomSheet({
  open,
  setOpen,
  children,
  onClose,
}: ToolbarBottomSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      <S.Overlay
        onClick={() => {
          if (onClose) onClose();
          setOpen(false);
        }}
      />
      <S.Wrapper>
        <S.Border />
        <S.Menus>{children}</S.Menus>
      </S.Wrapper>
    </>
  );
}
