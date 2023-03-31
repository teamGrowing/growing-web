import React from 'react';
import styled from 'styled-components';
import ModalPortal from './ModalPortal';
import { fadeIn } from '../../../styles/common/keyframs';

export interface ModalProps {
  onModal: boolean;
  setOnModal: (state: boolean) => void;
  title?: string;
  description?: string;
  mainActionLabel: string;
  subActionLabel?: string;
  onMainAction: () => void;
  onSubAction?: () => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 11;
`;
const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 246px;
  height: max-content;
  background: ${({ theme }) => theme.color.gray600};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 12;
`;
const Main = styled.div`
  width: 100%;
  padding: 17px 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
const Title = styled.div`
  width: 100%;
  font-family: 'PretendardBold';
  font-size: 17px;
  color: ${({ theme }) => theme.color.gray50};
  text-align: center;
`;
const Description = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray50};
  text-align: center;
  white-space: pre-wrap;
  word-break: break-all;
`;
const Buttons = styled.div`
  width: 100%;
  border-top: 0.5px solid ${({ theme }) => theme.color.gray50}50;
  display: flex;
`;
const StyledButton = styled.button<{ main: boolean }>`
  font-family: 'PretendardRegular';
  font-size: 14px;
  padding: 8px 0;
  flex: 1;
  ${(props) => !props.main && `color: ${props.theme.color.gray50};`}
  ${(props) =>
    !props.main && `border-right: 0.5px solid ${props.theme.color.gray50}50;`}
`;

export default function Modal({
  onModal,
  setOnModal,
  title,
  description,
  mainActionLabel,
  subActionLabel,
  onMainAction,
  onSubAction,
}: ModalProps) {
  if (!onModal) {
    return null;
  }

  return (
    <ModalPortal>
      <Overlay />
      <Wrapper>
        <Main>
          {title && <Title className="text-ellipsis">{title}</Title>}
          {description && <Description>{description}</Description>}
        </Main>
        <Buttons>
          {subActionLabel && onSubAction && (
            <StyledButton
              main={false}
              onClick={() => {
                setOnModal(false);
                onSubAction();
              }}
            >
              {subActionLabel}
            </StyledButton>
          )}
          {mainActionLabel && onMainAction && (
            <StyledButton
              main
              className="text-gradient300"
              onClick={() => {
                setOnModal(false);
                onMainAction();
              }}
            >
              {mainActionLabel}
            </StyledButton>
          )}
        </Buttons>
      </Wrapper>
    </ModalPortal>
  );
}
