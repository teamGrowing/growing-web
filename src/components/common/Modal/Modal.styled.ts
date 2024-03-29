import styled from 'styled-components';
import { fadeIn } from 'styles/common/animation';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.3s ease-in;
  z-index: 11;
`;
export const Wrapper = styled.div`
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
export const Main = styled.div`
  width: 100%;
  padding: 17px 24px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`;
export const Title = styled.div`
  width: 100%;
  font-family: 'PretendardBold';
  font-size: 17px;
  color: ${({ theme }) => theme.color.gray50};
  text-align: center;
`;
export const Description = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray50};
  text-align: center;
  white-space: pre-wrap;
  word-break: break-all;
`;
export const Buttons = styled.div`
  width: 100%;
  border-top: 0.5px solid ${({ theme }) => theme.color.gray50}50;
  display: flex;
`;
export const StyledButton = styled.button<{ main: boolean }>`
  font-family: 'PretendardRegular';
  font-size: 14px;
  padding: 8px 0;
  flex: 1;
  ${(props) => !props.main && `color: ${props.theme.color.gray50};`}
  ${(props) =>
    !props.main && `border-right: 0.5px solid ${props.theme.color.gray50}50;`}
`;
