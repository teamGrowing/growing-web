import styled from 'styled-components';
import { fadeInDown, fadeOutUp } from 'styles/common/keyframs';

export const SubMenuContainer = styled.div<{ openEnvelope: boolean }>`
  z-index: 2;

  position: fixed;
  top: calc(48px + constant(safe-area-inset-top));
  top: calc(48px + env(safe-area-inset-top));
  left: 0;
  right: 0;

  display: flex;
  justify-content: space-evenly;

  animation: ${(props) => (props.openEnvelope ? fadeInDown : fadeOutUp)} 0.5s;
  visibility: ${(props) => (!props.openEnvelope ? 'hidden' : 'visible')};
  transition: visibility 0.5s linear;

  padding: 16px 32px;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 0 0 20px 20px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
`;

export const Item = styled.div`
  flex: 1;

  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  font-family: 'PretendardLight';
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray900};
`;

export const Alarm = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% + 14px);
  transform: translateX(-50%);

  background-color: ${({ theme }) => theme.color.purple500};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
