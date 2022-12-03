import styled, { keyframes } from 'styled-components';

type ToastMessageProps = {
  message: string;
};

const fade = keyframes`
  0% {
    opacity: 0;
    visibility:hidden;
  }
  50% {
    opacity: 1;
    visibility:visible;
  }
  100%{
    opacity:0;
    visibility:hidden;
  }
}
`;

const MessageBox = styled.div`
  display: flex;
  visibility: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  gap: 10px;
  margin: auto;

  position: fixed;
  width: 300px;
  height: 34px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background: ${({ theme }) => theme.color.gray800};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  animation: ${fade} 2s 1s;
  animation-fill-mode: forwards;
`;

const Text = styled.div`
  width: 260px;
  height: 18px;

  font-weight: 400;
  font-size: 15px;
  line-height: 18px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient300};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  flex: none;
  order: 0;
  flex-grow: 1;
`;

function ToastMessage({ message }: ToastMessageProps) {
  return (
    <MessageBox>
      <Text>{message}</Text>
    </MessageBox>
  );
}

export default ToastMessage;