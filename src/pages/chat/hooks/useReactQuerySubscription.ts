import { useEffect } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import queryKeys from 'libs/react-query/queryKeys';
import SOCKET_KEY from 'constants/socketKeys';
import {
  ChattingDto,
  CreateChattingDto,
  ParentChildChattingDto,
} from 'models/chat';
import { socket } from 'mocks/socket';

interface Props {
  coupleId: string;
  userId: string;
  scrollToBottom: () => Promise<number>;
}

export default function useReactQuerySubscription({
  coupleId,
  userId,
  scrollToBottom,
}: Props) {
  const queryClient = useQueryClient();

  const createChatToServer = (dto: CreateChattingDto) => {
    socket.emit(SOCKET_KEY.CREATE_CHAT, dto);
  };

  useEffect(() => {
    const handleEnter = () => {
      socket.emit(SOCKET_KEY.ENTER, { coupleId, userId });
    };

    const handleGetChat = (res: ChattingDto) => {
      const receivedData: ParentChildChattingDto = {
        parentChatting: res,
        childChatting: null,
      };

      queryClient.setQueryData<
        InfiniteData<InfiniteData<ParentChildChattingDto>>
      >(queryKeys.chatKeys.all, (oldData: any) => {
        if (!oldData) {
          return {
            pages: [{ data: [receivedData] }],
            pageParams: [null],
          };
        }

        const updatedFirstPageData = {
          ...oldData.pages[0],
          data: [...oldData.pages[0].data, receivedData],
        };

        const updatedPages = [updatedFirstPageData, ...oldData.pages.slice(1)];

        return {
          ...oldData,
          pages: updatedPages,
        };
      });

      if (res.Writer.id === userId) {
        let delay: number = 100;
        if (res.imageUrls.length || res.videoUrls.length) {
          delay = 500;
        } else if (res.emojiUrl) {
          delay = 300;
        }
        setTimeout(scrollToBottom, delay);
      }
    };

    handleEnter();

    socket.on(SOCKET_KEY.GET_CHAT, handleGetChat);

    return () => {
      socket.off(SOCKET_KEY.GET_INFO);
      socket.off(SOCKET_KEY.GET_CHAT);
    };
  }, [coupleId, userId]);

  return { createChat: (dto: CreateChattingDto) => createChatToServer(dto) };
}
