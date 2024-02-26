import {
  useQuery,
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
  UseInfiniteQueryOptionsType,
  UseMutationOptionsType,
  UseQueryOptionsType,
} from 'types/CustomReactQuery';
import { PHOTO_LIMIT } from 'constants/constants';
import queryKeys from 'libs/react-query/queryKeys';
import { GALLERY_API, GALLERY_COMMENT_API } from 'apis/gallery';
import {
  CreatePhotoResponseDto,
  PhotoDto,
  PhotoCommentDto,
  PhotoLineDto,
} from 'models/gallery';
import { delayForVideoThumbnail, getVideoDuration } from 'utils/video';

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
    [...queryKeys.galleryKeys.list, ...(storeCode ?? [])],
    () => GALLERY_API.getPhotos(coupleId),
    {
      select: ({ data }) => data,
      ...options,
    }
  );
}

export function useInfiniteGalleryList({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: Omit<
    UseInfiniteQueryOptionsType<PhotoLineDto[]>,
    'queryKey' | 'queryFn'
  >;
}) {
  return useInfiniteQuery({
    queryKey: [...queryKeys.galleryKeys.infinite, ...(storeCode ?? [])],
    queryFn: ({ pageParam = 0 }) => {
      return GALLERY_API.getPhotos(coupleId, {
        base: pageParam,
        limit: PHOTO_LIMIT,
      });
    },
    getNextPageParam: (lastPages, allPages) =>
      lastPages.data.length < PHOTO_LIMIT
        ? undefined
        : allPages.length * PHOTO_LIMIT,
    select: (data) => ({
      pages: data.pages.map((res) => res.data),
      pageParams: data.pageParams,
    }),
    ...options,
  });
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
  const queryClient = useQueryClient();

  const makePhoto = async (file: File) => {
    const res = await GALLERY_API.getUploadUrl(coupleId, {
      name: `${uuidv4()}.${file.name.split('.').pop()}`,
    });

    await GALLERY_API.upLoadPhoto(res.data.url, file);

    let fileTime: number | null = null;
    if (file.type.includes('video')) {
      const promise = await getVideoDuration(file);
      fileTime = promise;
    }

    const axiosRes = await GALLERY_API.createPhoto(coupleId, {
      s3Path: res.data.s3Path,
      time: fileTime,
    });

    return axiosRes.data;
  };

  const makePhotos = async (files: FileList) => {
    const promises: Promise<CreatePhotoResponseDto>[] = [];
    for (let i = 0; i < files.length; i += 1) {
      promises.push(makePhoto(files[i]));
    }
    await Promise.all(promises);

    await delayForVideoThumbnail();

    return promises;
  };

  return useMutation({
    mutationFn: (data: FileList) => makePhotos(data),
    onSuccess: () =>
      queryClient.invalidateQueries(queryKeys.galleryKeys.all, {}),
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
  const queryClient = useQueryClient();
  const deletePhotos = async (ids: string[]) => {
    const promises: Promise<AxiosResponse>[] = [];
    ids.forEach((id) => {
      promises.push(GALLERY_API.deletePhoto(coupleId, id));
    });
    await Promise.all(promises);
  };

  return useMutation({
    mutationFn: (photoIds: string[]) => deletePhotos(photoIds),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.galleryKeys.all,
        refetchType: 'all',
      });
      await queryClient.invalidateQueries({
        queryKey: queryKeys.albumKeys.all,
        refetchType: 'all',
      });
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      GALLERY_COMMENT_API.postComment(coupleId, photoId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.galleryKeys.commentById(photoId));
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      GALLERY_COMMENT_API.deleteComment(coupleId, photoId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.galleryKeys.commentById(photoId));
    },
    ...options,
  });
}
