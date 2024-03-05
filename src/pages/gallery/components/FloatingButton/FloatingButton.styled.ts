import styled from 'styled-components';
import { fadeIn } from 'styles/common/animation';

export const ButtonStyle = styled.div`
  position: fixed;
  right: 20px;
  bottom: calc(var(--navbar-real-height) + 10px);
  z-index: 999;
`;

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  display: flex;
`;

export const Input = styled.input`
  display: none;
`;

export const Progress = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: var(--navbar-real-height);

  width: 100%;
  max-width: var(--full-width);

  animation: ${fadeIn} 0.3s ease-in;
`;

export const ProgressMessage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding: 4px 20px;

  font-family: PretendardBold;
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};
`;
