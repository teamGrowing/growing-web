import { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import changeEmojiToSpan from '../../../util/Text';
import ToastContext from './ToastContext';

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
`;

const MessageBox = styled.div`
  display: flex;
  visibility: hidden;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  gap: 10px;
  margin: 0 auto;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 120px;
  width: 300px;

  background: ${({ theme }) => theme.color.gray800};
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  animation: ${fade} 2s;
`;

const Text = styled.div`
  width: 260px;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;

  > span {
    -webkit-text-fill-color: initial;
  }

  flex: none;
  order: 0;
  flex-grow: 1;
`;

type ToastMessageProps = {
  message: string;
  id: number;
};

function ToastMessage({ message, id }: ToastMessageProps) {
  const root = document.getElementById('toast-message-root');
  const ctx = useContext(ToastContext);
  useEffect(() => {
    const timer = setTimeout(() => {
      ctx.removeToast(id);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!root) return null;

  return (
    <>
      {ReactDOM.createPortal(
        <MessageBox>
          <Text
            className="text-gradient300"
            dangerouslySetInnerHTML={changeEmojiToSpan(message)}
          />
        </MessageBox>,
        root
      )}
    </>
  );
}

export default ToastMessage;
