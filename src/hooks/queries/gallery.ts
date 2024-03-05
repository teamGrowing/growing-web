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
import { PhotoDto, PhotoCommentDto, PhotoLineDto } from 'models/gallery';
import { CreatePhotoRequestDto, GetUploadUrlResponseDto } from 'models/chat';

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

interface GetUploadUrlProps {
  coupleId: string;
  options?: UseMutationOptions<
    AxiosResponse<GetUploadUrlResponseDto>,
    AxiosError,
    File,
    unknown
  >;
}

export function useGetUploadUrl({ coupleId, options }: GetUploadUrlProps) {
  return useMutation({
    mutationFn: (file: File) =>
      GALLERY_API.getUploadUrl(coupleId, {
        name: `${uuidv4()}.${file.name.split('.').pop()}`,
      }),
    useErrorBoundary: false,
    ...options,
  });
}

export function useUploadPhotoMutation(): UseMutationResult<
  AxiosResponse,
  AxiosError,
  { url: string; file: File },
  unknown
> {
  return useMutation({
    mutationFn: ({ url, file }) => GALLERY_API.upLoadPhoto(url, file),
    onSuccess: () => {},
    useErrorBoundary: false,
  });
}

interface CreatePhotoMutationProps {
  coupleId: string;
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    CreatePhotoRequestDto,
    unknown
  >;
}

export function useCreatePhotoMutation({
  coupleId,
  options,
}: CreatePhotoMutationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ s3Path, time }: CreatePhotoRequestDto) =>
      GALLERY_API.createPhoto(coupleId, {
        s3Path,
        time,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.galleryKeys.all, {});
    },
    useErrorBoundary: false,
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
    useErrorBoundary: false,
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
