import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import queryKeys from 'constants/queryKeys';
import SOCKET_KEY from 'constants/socketKeys';
import { RoomInfo } from 'types/chat/RoomInfo';
import { ChattingDto } from 'types/chat/Chatting.dto';
import { CreateChattingDto } from 'types/chat/createChat.dto';

export default function useReactQuerySubscription({
  coupleId,
  userId,
}: {
  coupleId: string;
  userId: string;
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
      if (res.isMine) {
        // TODO: scroll 제일 밑으로
      }
      return res;
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { createChat: (dto: CreateChattingDto) => createChatToServer(dto) };
}
