import { FallbackProps } from 'react-error-boundary';
import CommonErrorFallback from '../CommonErrorFallback';

const Fallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <CommonErrorFallback
      content="예상치 못한 에러가 발생했습니다."
      resetErrorBoundary={resetErrorBoundary}
    />
  );
};

export default Fallback;
