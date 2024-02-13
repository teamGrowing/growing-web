import styled from 'styled-components';
import { fadeIn } from 'styles/common/animation';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.3s ease-in;
`;
export const Wrapper = styled.div`
  z-index: 10;

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
export const InputContainer = styled.div`
  padding: 4px 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const InputRow = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray50};
  display: flex;
  justify-content: center;
  gap: 10px;

  p {
    padding-top: 5px;
    width: 40px;
    text-align: center;
    font-size: 12px;
  }
`;
export const StyledInput = styled.input`
  width: 100%;

  padding: 4px 10px;
  height: 25px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  opacity: 0.8;
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray900};
`;
export const InputWithError = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    padding-left: 2px;
    width: max-content;
  }
`;
