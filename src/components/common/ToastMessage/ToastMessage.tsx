import { useContext, useEffect } from 'react';
import changeEmojiToSpan from 'utils/Text';
import ToastContext from './ToastContext';
import * as S from './ToastMessage.styled';
import Portal from '../Portal';

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
    <Portal type="toast-message-root">
      <S.MessageBox>
        <S.Text
          className="text-gradient300"
          dangerouslySetInnerHTML={changeEmojiToSpan(message)}
        />
      </S.MessageBox>
    </Portal>
  );
}

export default ToastMessage;
