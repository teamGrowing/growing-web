import { throttle } from 'lodash';
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 스크롤 위치를 저장하고 복원하는 커스텀 훅
 */
const useScrollRestoration = (
  chatsRef: React.MutableRefObject<HTMLDivElement | null>,
  chatEndRef?: React.MutableRefObject<HTMLDivElement | null>
) => {
  const location = useLocation();

  const saveScrollPosition = throttle(() => {
    if (!chatsRef.current) return;
    const scrollPosition = JSON.stringify(chatsRef.current.scrollTop);
    sessionStorage.setItem(
      `scrollPosition_${location.pathname}`,
      scrollPosition
    );
  }, 100);

  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem(
      `scrollPosition_${location.pathname}`
    );

    if (chatsRef.current && savedPosition) {
      //  사용자가 뒤로 가기를 사용했을 때 스크롤 위치 복원
      setTimeout(() => {
        chatsRef.current?.scrollTo(0, parseInt(savedPosition, 10));
      }, 10);
    } else if (chatEndRef?.current) {
      // 페이지에 처음 접근했을 때
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView();
      }, 100);
    }
  };

  useLayoutEffect(() => {
    restoreScrollPosition();
    window.addEventListener('popstate', restoreScrollPosition);

    return () => {
      window.removeEventListener('popstate', restoreScrollPosition);
      saveScrollPosition.cancel(); // throttle 함수에 의해 예약된 호출을 취소
    };
  }, [location.pathname, chatsRef, chatEndRef]);

  return { saveScrollPosition };
};

export default useScrollRestoration;
