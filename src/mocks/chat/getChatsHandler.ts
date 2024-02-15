import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { ChatRequestDto, ParentChildChattingDto } from 'models/chat';

type Params = {
  coupleId: string;
};

const data: ParentChildChattingDto[] = [
  {
    parentChatting: {
      id: '1',
      content: 'hihi',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: true,
      Writer: {
        id: '2',
        name: '연쥬',
        imageUrl: '',
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '2',
      content: 'hello',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: false,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: '',
      },
    },
    childChatting: null,
  },
];

export const getChatsHandler = createApiHandler<
  Params,
  ChatRequestDto,
  NullableResponse<ParentChildChattingDto[]>
>('/couples/:coupleId/chattings', 'get', () => ({
  200: data,
  400: null,
}));
