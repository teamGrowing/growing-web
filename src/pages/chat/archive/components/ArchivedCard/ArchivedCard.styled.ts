import styled, { css } from 'styled-components';
import { clickPulse, pulse } from 'styles/common/animation';

export const Outer = styled.div<{ isSelected: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2px;

  padding: 24px 12px 0;

  width: 100%;
  max-width: 220px;

  overflow: hidden;

  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  animation: ${(props) =>
    props.isSelected &&
    css`
      ${clickPulse} .2s linear
    `};
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.3) 7.3%,
    rgba(234, 96, 96, 0.3) 100%
  );
  border-radius: 10px;
`;

export const StyledDate = styled.p`
  font-family: 'PretendardLight';
  font-size: 12px;
`;

export const StyledIcon = styled.div`
  z-index: 1;

  position: absolute;
  top: 14px;
  right: -11px;
`;

export const Inner = styled.div<{ isPopUp: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (!props.isPopUp ? 'center' : 'flex-start')};
  align-items: center;

  padding: 12px 8px;

  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.8);
  font-size: 14px;

  p {
    z-index: 1;
    padding: 0 12px;
  }

  span {
    z-index: 1;
  }
`;

export const StyledSpan = styled.span<{ isLong: boolean }>`
  white-space: normal;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.isLong ? 10 : 2)};
  -webkit-box-orient: vertical;
`;

export const PopUp = styled.section`
  z-index: 11;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #00000040;
`;

export const PopUpCardWrapper = styled.div`
  position: relative;
  z-index: 12;

  width: 66%;
  max-width: 300px;
  overflow-x: hidden;
  height: 46%;
  max-height: 400px;

  background-color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  animation: 0.5s ${pulse};
`;

export const PopUpCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;

  padding: 36px 20px 0;

  height: 100%;
  overflow-y: hidden;

  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.3) 7.3%,
    rgba(243, 129, 129, 0.3) 100%
  );
`;

export const PopUpCardInner = styled(Inner)`
  padding: 18px 12px 50px;

  height: 100%;
  overflow-y: scroll;
`;

export const Lines = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 32px 12px 0;
`;

export const Line = styled.div`
  width: 100%;
  height: 1;

  border-bottom: 1px dashed ${({ theme }) => theme.color.purple200};
`;
