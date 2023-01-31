import React from 'react';
import styled, { keyframes } from 'styled-components';
import ModalPortal from '../ModalPortal';

interface ModalBottomSheetProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  children: React.ReactNode;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black}19;
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 11;
`;
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    transform: translateZ(0);
  }
`;
const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 24px 12px 24px;
  background-color: ${({ theme }) => theme.color.gray600};
  box-shadow: 0px 0px 20px ${({ theme }) => theme.color.black}33;
  border-radius: 20px 20px 0px 0px;
  color: ${({ theme }) => theme.color.gray50};
  animation: ${fadeInUp} 0.5s;
  z-index: 12;
`;
const Border = styled.div`
  margin-bottom: 12px;
  width: 50px;
  height: 5px;
  background-color: ${({ theme }) => theme.color.white}60;
  border-radius: 10px;
`;
const Menus = styled.div`
  width: 100%;
`;

/**
 * 🌈 BottomSheetMenu와 같이 사용하시면 됩니다.
 */
export default function ModalBottomSheet({
  open,
  setOpen,
  children,
}: ModalBottomSheetProps) {
  if (!open) {
    return null;
  }

  return (
    <ModalPortal>
      <Overlay onClick={() => setOpen(false)} />
      <Wrapper>
        <Border />
        <Menus>{children}</Menus>
      </Wrapper>
    </ModalPortal>
  );
}
