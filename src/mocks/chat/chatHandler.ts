import { v4 as uuidv4 } from 'uuid';
import {
  NullableResponse,
  createApiHandler,
  getSearchParams,
} from 'mocks/createApiHandler';
import {
  ChatPhotoDto,
  ChatPhotoLineDto,
  ChatRequestDto,
  ChattingDto,
  CreatePhotoRequestDto,
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
  ParentChildChattingDto,
} from 'models/chat';
import { CreatePhotoResponseDto } from 'models/gallery';
import { originData } from './data/chatData';

let chatData: ParentChildChattingDto[] = originData;

export const findChatData = (id: string): ChattingDto =>
  chatData.filter((chat) => chat.parentChatting.id === id)[0].parentChatting;

export const addChatData = (data: ChattingDto) =>
  chatData.push({ parentChatting: data, childChatting: null });

// chatting 관련

type ChatGetParams = {
  coupleId: string;
};

type ChatDeleteParams = {
  coupleId: string;
  chattingId: string;
};

const getPartialChat = ({
  base,
  limit,
}: ChatRequestDto): ParentChildChattingDto[] => {
  const startIndex = chatData.length - base - limit;
  if (chatData.length <= base) {
    return [];
  }
  return chatData.slice(startIndex < 0 ? 0 : startIndex, startIndex + limit);
};

export const getChatsHandler = createApiHandler<
  ChatGetParams,
  ChatRequestDto,
  NullableResponse<ParentChildChattingDto[]>
>({
  path: '/couples/:coupleId/chattings',
  method: 'get',
  requestHandler: (_, request) => {
    const searchParams = getSearchParams(request.url);
    const base = Number(searchParams.get('base')) || 0;
    const limit = Number(searchParams.get('limit')) || 8;
    const offset = Number(searchParams.get('offset')) || 0;

    const partialChat = getPartialChat({ base, limit, offset });

    return {
      200: partialChat,
      400: null,
    };
  },
});

export const deleteOurChatHandler = createApiHandler<
  ChatDeleteParams,
  {},
  null
>({
  path: '/couples/:coupleId/chattings/:chattingId/delete-ours',
  method: 'delete',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
  onSuccess: ({ chattingId }) => {
    chatData = chatData.filter((chat) => chat.parentChatting.id !== chattingId);
  },
});

// photo 관련

const findImageChat = (): ChatPhotoLineDto[] =>
  chatData
    .filter(
      (chat) =>
        chat.parentChatting.imageUrls.length > 0 ||
        chat.parentChatting.videoUrls.length > 0
    )
    .map((chat) => {
      if (chat.parentChatting.imageUrls.length > 0) {
        return {
          i: chat.parentChatting.id,
          u: chat.parentChatting.imageUrls,
          c: '',
          t: null,
        };
      }

      return {
        i: chat.parentChatting.id,
        u: chat.parentChatting.videoUrls.map((video) => video.thumbnailUrl),
        c: '',
        t: chat.parentChatting.videoUrls.map((video) => video.time)[0],
      };
    });

type PhotoGetParams = {
  coupleId: string;
};

export const getPhotosHandler = createApiHandler<
  PhotoGetParams,
  {},
  NullableResponse<ChatPhotoLineDto[]>
>({
  path: '/couples/:coupleId/chattings/photos',
  method: 'get',
  requestHandler: () => ({
    200: findImageChat(),
    400: null,
  }),
});

type PhotoDetailGetParams = {
  coupleId: string;
  chattingId: string;
};

export const getPhotoDetailHandler = createApiHandler<
  PhotoDetailGetParams,
  {},
  NullableResponse<ChatPhotoDto>
>({
  path: '/couples/:coupleId/chattings/:chattingId/photos',
  method: 'get',
  requestHandler: ({ chattingId }) => {
    const { id, createdAt, Writer, imageUrls, videoUrls } =
      findChatData(chattingId);

    const data: ChatPhotoDto = {
      id,
      createdAt: createdAt.toISOString(),
      name: Writer.name,
      photos: imageUrls.map((url) => ({ id: uuidv4(), url })),
      video: videoUrls.map((rest) => ({ id: uuidv4(), ...rest }))[0],
    };

    return {
      200: data,
      400: null,
    };
  },
});

type GalleryPostParams = {
  coupleId: string;
  photoId: string;
};

export const postPutGalleryHandler = createApiHandler<
  GalleryPostParams,
  {},
  null
>({
  path: '/couples/:coupleId/chattings/photos/:photoId/put-gallery',
  method: 'post',
  requestHandler: () => ({
    200: null,
    400: null,
  }),
});

type UploadUrlGetParams = {
  coupleId: string;
};

export const getUploadUrlHandler = createApiHandler<
  UploadUrlGetParams,
  GetUploadUrlRequestDto,
  NullableResponse<GetUploadUrlResponseDto>
>({
  path: '/couples/:coupleId/chattings/photos/get-upload-url',
  method: 'post',
  requestHandler: () => ({
    200: {
      url: 'url',
      s3Path: 'url',
    },
    400: null,
  }),
});

type CreatePhotoParams = {
  coupleId: string;
};

export const createPhotoHandler = createApiHandler<
  CreatePhotoParams,
  CreatePhotoRequestDto,
  NullableResponse<CreatePhotoResponseDto>
>({
  path: '/couples/:coupleId/chattings/photos/create',
  method: 'post',
  requestHandler: () => ({
    200: {
      photoId: '11',
    },
    400: null,
  }),
});
