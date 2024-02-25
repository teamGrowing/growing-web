import { ChattingArchivedDto } from 'models/chat';
import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { findChatData } from './chatHandler';

let archivedData: ChattingArchivedDto[] = [
  {
    chattingId: findChatData('1').id,
    content: findChatData('1').content ?? '',
    writerName: findChatData('1').Writer.name,
    writedAt: findChatData('1').createdAt,
    archivedAt: new Date('2024.02.14'),
  },
  {
    chattingId: findChatData('2').id,
    content: findChatData('2').content ?? '',
    writerName: findChatData('2').Writer.name,
    writedAt: findChatData('2').createdAt,
    archivedAt: new Date('2024.02.14'),
  },
];

type ArchivedGetParams = {
  coupleId: string;
};

export const getArchivedChatHandler = createApiHandler<
  ArchivedGetParams,
  {},
  NullableResponse<ChattingArchivedDto[]>
>({
  path: '/couples/:coupleId/archived-chattings',
  method: 'get',
  requestHandler: () => ({
    200: archivedData,
    400: null,
  }),
});

type ArchivedPostParams = {
  coupleId: string;
  chattingId: string;
};

export const postArchivedChatHandler = createApiHandler<
  ArchivedPostParams,
  {},
  null
>({
  path: '/couples/:coupleId/chattings/:chattingId/archive',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: ({ chattingId }) => {
    archivedData = [
      ...archivedData,
      {
        chattingId: findChatData(chattingId).id,
        content: findChatData(chattingId).content ?? '',
        writerName: findChatData(chattingId).Writer.name,
        writedAt: findChatData(chattingId).createdAt,
        archivedAt: new Date('2024.02.14'),
      },
    ];
  },
});

export const deleteArchivedChatHandler = createApiHandler<
  ArchivedPostParams,
  {},
  null
>({
  path: '/couples/:coupleId/archived-chattings/:chattingId',
  method: 'delete',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: ({ chattingId }) => {
    archivedData = archivedData.filter(
      (archived) => archived.chattingId !== chattingId
    );
  },
});
