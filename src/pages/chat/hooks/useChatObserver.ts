import { useEffect, useState } from 'react';

/**
 * 무한스크롤 및 스크롤 위치 고정에 관한 훅
 */
const useChatObserver = ({
  chatStartRef,
  chatsRef,
  isFetchingNextPage,
  fetchNextPage,
}: {
  chatStartRef: React.MutableRefObject<HTMLDivElement | null>;
  chatsRef: React.MutableRefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}) => {
  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);

  useEffect(() => {
    // 무한스크롤시 스크롤 위치 고정
    if (!isFetchingNextPage) {
      const scrollHeight = chatsRef.current?.scrollHeight ?? 0;
      chatsRef.current?.scrollTo(0, scrollHeight - prevScrollHeight);
    }
  }, [isFetchingNextPage]);

  useEffect(() => {
    if (!chatStartRef.current) {
      return;
    }

    const chatObserver = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          const scrollHeight = chatsRef.current?.scrollHeight ?? 0;
          setPrevScrollHeight(scrollHeight);
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
      }
    );
    // 채팅창 상단으로 이동시, 추가적인 데이터 요청
    chatObserver.observe(chatStartRef.current);

    // eslint-disable-next-line consistent-return
    return () => chatObserver.disconnect();
  }, [chatStartRef, chatsRef, fetchNextPage, isFetchingNextPage]);
};

export default useChatObserver;
