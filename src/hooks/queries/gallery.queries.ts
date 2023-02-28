import {
  useQuery,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { UseMutationOptionsType, UseQueryOptionsType } from '../../services';
import {
  GALLERY_API,
  GALLERY_COMMENT_API,
} from '../../services/gallery.service';
import { CreatePhotoResponseDto } from '../../types/gallery/CreatePhotoResponse.dto';
import PhotoDto from '../../types/gallery/Photo.dto';
import PhotoCommentDto from '../../types/gallery/PhotoComment.dto';
import { PhotoLineDto } from '../../types/gallery/PhotoLine.dto';

export function useGalleryList({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<PhotoLineDto[]>;
}) {
  return useQuery(
    [...queryKeys.galleryKeys.all, ...(storeCode ?? [])],
    () => GALLERY_API.getPhotos(coupleId),
    {
      select: ({ data }) => data,
      ...options,
    }
  );
}

export function useGalleryDetail({
  coupleId,
  photoId,
  storeCode,
  options,
}: {
  coupleId: string;
  photoId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<PhotoDto>;
}) {
  return useQuery(
    [...queryKeys.galleryKeys.byId(photoId), ...(storeCode ?? [])],
    () => GALLERY_API.getPhotoDetail(coupleId, photoId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useCommentList({
  coupleId,
  photoId,
  storeCode,
  options,
}: {
  coupleId: string;
  photoId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<PhotoCommentDto[]>;
}) {
  return useQuery(
    [...queryKeys.galleryKeys.commentById(photoId), ...(storeCode ?? [])],
    () => GALLERY_COMMENT_API.getComments(coupleId, photoId),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

export function useCreatePhotosMutation({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptions<
    Promise<CreatePhotoResponseDto>[],
    AxiosError,
    FileList,
    unknown
  >;
}): UseMutationResult<
  Promise<CreatePhotoResponseDto>[],
  AxiosError,
  FileList,
  unknown
> {
  const queryClinet = useQueryClient();

  const makePhoto = async (file: File) => {
    const res = await GALLERY_API.getUploadUrl(coupleId, {
      name: file.name,
    });

    await axios.put(res.data.url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }); // 권한이 필요없나?

    const axiosRes = await GALLERY_API.createPhoto(coupleId, {
      s3Path: res.data.s3Path,
    });

    return axiosRes.data;
  };

  const makePhotos = async (files: FileList) => {
    const promises: Promise<CreatePhotoResponseDto>[] = [];
    for (let i = 0; i < files.length; i += 1) {
      promises.push(makePhoto(files[i]));
    }
    await Promise.all(promises);
    return promises;
  };

  return useMutation({
    mutationFn: (data: FileList) => makePhotos(data),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.galleryKeys.all);
    },
    ...options,
  });
}

export function useDeletePhotosMutation({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptions<void, AxiosError, string[], unknown>;
}): UseMutationResult<void, AxiosError, string[], unknown> {
  const queryClinet = useQueryClient();
  const deletePhotos = async (ids: string[]) => {
    const promises: Promise<AxiosResponse>[] = [];
    ids.forEach((id) => {
      promises.push(GALLERY_API.deletePhoto(coupleId, id));
    });
    await Promise.all(promises);
  };

  return useMutation({
    mutationFn: (photoIds: string[]) => deletePhotos(photoIds),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.galleryKeys.all);
      queryClinet.invalidateQueries(queryKeys.albumKeys.all);
    },
    ...options,
  });
}

export function usePostCommentMutation({
  coupleId,
  photoId,
  options,
}: {
  coupleId: string;
  photoId: string;
  options?: UseMutationOptionsType<string>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      GALLERY_COMMENT_API.postComment(coupleId, photoId, { content }),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.galleryKeys.commentById(photoId));
    },
    ...options,
  });
}

export function useDeleteCommentMutation({
  coupleId,
  photoId,
  options,
}: {
  coupleId: string;
  photoId: string;
  options?: UseMutationOptionsType<string>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      GALLERY_COMMENT_API.deleteComment(coupleId, photoId, commentId),
    onSuccess: () => {
      queryClinet.invalidateQueries(queryKeys.galleryKeys.commentById(photoId));
    },
    ...options,
  });
}
