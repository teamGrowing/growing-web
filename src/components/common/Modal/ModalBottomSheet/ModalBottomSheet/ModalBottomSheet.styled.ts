import styled from 'styled-components';
import { fadeIn, fadeInUp } from 'styles/common/keyframs';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black}19;
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 11;
`;
export const Wrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px 24px 0 24px;

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  background-color: ${({ theme }) => theme.color.gray600};
  box-shadow: 0px 0px 20px ${({ theme }) => theme.color.black}33;
  border-radius: 20px 20px 0px 0px;
  color: ${({ theme }) => theme.color.gray50};
  animation: ${fadeInUp} 0.5s;
  z-index: 12;
`;
export const Border = styled.div`
  margin-bottom: 12px;
  width: 50px;
  height: 5px;
  background-color: ${({ theme }) => theme.color.white}60;
  border-radius: 10px;
`;
export const Menus = styled.div`
  width: 100%;
`;
