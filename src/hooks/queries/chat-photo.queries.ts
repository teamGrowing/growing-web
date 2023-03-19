import {
  QueryKey,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { UseMutationOptionsType, UseQueryOptionsType } from '../../services';
import { CHAT_PHOTO_API } from '../../services/chat.service';
import { ChatPhotoDto } from '../../types/chat/ChatPhoto.dto';
import { ChatPhotoLineDto } from '../../types/chat/ChatPhotoLine.dto';
import { CreatePhotoRequestDto } from '../../types/chat/CreatePhotoRequest.dto';
import { CreatePhotoResponseDto } from '../../types/chat/CreatePhotoResponse.dto';
import { GetUploadUrlRequestDto } from '../../types/chat/GetUploadUrlRequest.dto';
import { GetUploadUrlResponseDto } from '../../types/chat/GetUploadUrlResponse.dto';

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
