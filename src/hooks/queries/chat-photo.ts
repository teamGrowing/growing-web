import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from 'constants/queryKeys';
import {
  UseMutationOptionsType,
  UseQueryOptionsType,
} from 'types/CustomReactQuery';
import { CHAT_PHOTO_API } from 'apis/chat';
import {
  ChatPhotoDto,
  ChatPhotoLineDto,
  CreatePhotoRequestDto,
  CreatePhotoResponseDto,
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
} from 'models/chat';

export function useChatPhotoBoxData({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<ChatPhotoLineDto[]>;
}) {
  return useQuery(
    [...queryKeys.chatKeys.photos, ...(storeCode ?? [])],
    () => CHAT_PHOTO_API.getPhotos(coupleId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useChatPhotoDetailData({
  coupleId,
  chattingId,
  storeCode,
  options,
}: {
  coupleId: string;
  chattingId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<ChatPhotoDto>;
}) {
  return useQuery(
    [...queryKeys.chatKeys.photoById(chattingId), ...(storeCode ?? [])],
    () => CHAT_PHOTO_API.getPhotoDetail(coupleId, chattingId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useChatPhotoUploadMutate({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptionsType<GetUploadUrlRequestDto>;
}): UseMutationResult<
  AxiosResponse<GetUploadUrlResponseDto>,
  AxiosError,
  GetUploadUrlRequestDto,
  unknown
> {
  return useMutation({
    mutationFn: (data: GetUploadUrlRequestDto) =>
      CHAT_PHOTO_API.getUploadUrl(coupleId, data),
    ...options,
  });
}

export function useChatPhotoCreateMutate({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptionsType<CreatePhotoRequestDto>;
}): UseMutationResult<
  AxiosResponse<CreatePhotoResponseDto>,
  AxiosError,
  CreatePhotoRequestDto,
  unknown
> {
  return useMutation({
    mutationFn: (data: CreatePhotoRequestDto) =>
      CHAT_PHOTO_API.createPhoto(coupleId, data),
    ...options,
  });
}

export function useChatPhotoToGallery({
  coupleId,
  photoId,
  options,
}: {
  coupleId: string;
  photoId: string;
  options?: UseMutationOptionsType<unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, unknown, unknown> {
  return useMutation({
    mutationFn: () => CHAT_PHOTO_API.postPutGallery(coupleId, photoId),
    ...options,
  });
}
