import React from 'react';
import * as S from './ModalBottomSheet.styled';
import Portal from '../Portal';

interface ModalBottomSheetProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  children: React.ReactNode;
  onClose?: () => void;
}

/**
 * 🌈 BottomSheetMenu와 같이 사용하시면 됩니다.
 */
export default function ModalBottomSheet({
  open,
  setOpen,
  children,
  onClose,
}: ModalBottomSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <Portal type="modal-root">
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
    </Portal>
  );
}
