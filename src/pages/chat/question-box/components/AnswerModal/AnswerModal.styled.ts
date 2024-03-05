import styled from 'styled-components';
import { fadeIn } from 'styles/common/animation';
import { hoverShrinkEffect } from 'styles/common/mixin';

export const Overlay = styled.div`
  z-index: 11;

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease-in;
`;

export const Wrapper = styled.div`
  z-index: 12;

  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: 261px;
  height: max-content;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.3s ease-in;

  border: 0.6px solid transparent;
  border-radius: 18px;
  background-image: linear-gradient(#fff, #fff),
    ${({ theme }) => theme.color.gradient400};
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const StyledDate = styled.div`
  width: 100%;
  padding-left: 8px;

  font-family: 'PretendardMedium';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray500};
`;

export const StyledQuestion = styled.div`
  padding: 0px 16px;
  font-size: 15px;
  font-family: 'PretendardBold';
  color: ${({ theme }) => theme.color.gray600};
  text-align: center;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;

  background-color: ${({ theme }) => theme.color.white};
  padding: 24px 16px;
  border-radius: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;

  width: 100%;
`;

export const AnswerTextarea = styled.div`
  width: 100%;
  height: 110px;
  padding: 14px 16px;

  background: ${({ theme }) => theme.color.background};
  border-radius: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: transparent;

  font-family: 'PretendardMedium';
  color: ${({ theme }) => theme.color.gray600};
`;

export const StyledButton = styled.button<{ main: boolean }>`
  flex: 1;

  padding: 8px 11px;
  border-radius: 10px;

  font-family: 'PretendardMedium';
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray900};

  background: ${({ main, theme }) =>
    main ? theme.color.background : theme.color.gray100};

  ${hoverShrinkEffect}
`;
