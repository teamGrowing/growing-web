import { FallbackProps } from 'react-error-boundary';
import { AxiosError } from 'axios';
import CommonErrorFallback from '../CommonErrorFallback';

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const isAxiosError = (err: Error) => {
    return err instanceof AxiosError;
  };

  if (!isAxiosError(error)) {
    throw error;
  }

  return (
    <CommonErrorFallback
      content="네트워크 에러가 발생했습니다."
      resetErrorBoundary={resetErrorBoundary}
    />
  );
};

export default Fallback;
