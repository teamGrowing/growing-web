import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import queryKeys from 'libs/react-query/queryKeys';
import SOCKET_KEY from 'constants/socketKeys';
import { RoomInfo, ChattingDto, CreateChattingDto } from 'models/chat';

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
  const socket = io(process.env.REACT_APP_SOCKET_HOST!, {
    transports: ['websocket'],
    withCredentials: true,
  });

  const createChatToServer = (dto: CreateChattingDto) => {
    socket.emit(SOCKET_KEY.CREATE_CHAT, dto);
  };

  useEffect(() => {
    socket.connect();

    socket.emit(SOCKET_KEY.ENTER, {
      coupleId,
      userId,
    });

    socket.on(SOCKET_KEY.GET_INFO, (res: RoomInfo) => {
      return res;
    });

    socket.on(SOCKET_KEY.GET_CHAT, (res: ChattingDto) => {
      queryClient.invalidateQueries(queryKeys.chatKeys.all);

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
      socket.disconnect();
    };
  }, []);

  return { createChat: (dto: CreateChattingDto) => createChatToServer(dto) };
}
