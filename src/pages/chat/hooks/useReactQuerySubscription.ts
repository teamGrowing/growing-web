import { useEffect } from 'react';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import queryKeys from 'libs/react-query/queryKeys';
import SOCKET_KEY from 'constants/socketKeys';
import {
  RoomInfo,
  ChattingDto,
  CreateChattingDto,
  ParentChildChattingDto,
} from 'models/chat';
import { socket } from 'mocks/socket';

export default function useReactQuerySubscription({
  coupleId,
  userId,
  scrollToBottom,
}: {
  coupleId: string;
  userId: string;
  scrollToBottom: () => Promise<number>;
}) {
  const queryClient = useQueryClient();

  const createChatToServer = (dto: CreateChattingDto) => {
    socket.emit(SOCKET_KEY.CREATE_CHAT, dto);
  };

  useEffect(() => {
    socket.emit(SOCKET_KEY.ENTER, {
      coupleId,
      userId,
    });

    socket.on(SOCKET_KEY.GET_INFO, (res: RoomInfo) => {
      return res;
    });

    socket.on(SOCKET_KEY.GET_CHAT, (res: ChattingDto) => {
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
        let t: number = 100;
        if (res.imageUrls.length || res.videoUrls.length) {
          t = 500;
        } else if (res.emojiUrl) {
          t = 300;
        }
        const timer = setTimeout(() => {
          scrollToBottom().then(() => {
            clearTimeout(timer);
          });
        }, t);
      }
    });

    return () => {
      socket.off(SOCKET_KEY.GET_INFO);
      socket.off(SOCKET_KEY.GET_CHAT);
    };
  }, [coupleId, userId]);

  return { createChat: (dto: CreateChattingDto) => createChatToServer(dto) };
}
