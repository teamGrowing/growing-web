import {
  useQuery,
  QueryKey,
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import AlbumDto from '../../types/gallery/Album.dto';
import ALBUM_API from '../../services/album.service';
import { PhotoLineDto } from '../../types/gallery/PhotoLine.dto';
import { CreateAlbumDto } from '../../types/gallery/CreateAlbum.dto';
import { AddPhotoDto } from '../../types/gallery/AddPhoto.dto';
import { ChangeAlbumTitleDto } from '../../types/gallery/ChangeAlbumTitle.dto';

export function useAlbumsList({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<AlbumDto[]>;
}) {
  return useQuery(
    [...queryKeys.albumKeys.all, ...(storeCode ?? [])],
    () => ALBUM_API.getAlbums(coupleId),
    {
      select: ({ data }) => data,
      ...options,
    }
  );
}

export function useAlbumPhotosList({
  coupleId,
  albumId,
  storeCode,
  options,
}: {
  coupleId: string;
  albumId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<PhotoLineDto[]>;
}) {
  return useQuery(
    [...queryKeys.albumKeys.byId(albumId), ...(storeCode ?? [])],
    () => ALBUM_API.getPhotos(coupleId, albumId),
    {
      select: ({ data }) => data,
      ...options,
    }
  );
}

export function usePostAlbumsMutation({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    CreateAlbumDto,
    unknown
  >;
}): UseMutationResult<AxiosResponse, AxiosError, CreateAlbumDto, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAlbumDto) => ALBUM_API.postAlbums(coupleId, data),
    onSuccess: () => {
      queryClinet.invalidateQueries([...queryKeys.albumKeys.all]);
    },
    ...options,
  });
}

export function usePostPhotosMutation({
  coupleId,
  albumId,
  options,
}: {
  coupleId: string;
  albumId: string;
  options?: UseMutationOptions<AxiosResponse, AxiosError, AddPhotoDto, unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, AddPhotoDto, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (imageIds: AddPhotoDto) =>
      ALBUM_API.postPhotos(coupleId, albumId, imageIds),
    onSuccess: () => {
      queryClinet.invalidateQueries([...queryKeys.albumKeys.all]);
    },
    ...options,
  });
}

export function usePatchAlbumMutation({
  coupleId,
  albumId,
  options,
}: {
  coupleId: string;
  albumId: string;
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    ChangeAlbumTitleDto,
    unknown
  >;
}): UseMutationResult<AxiosResponse, AxiosError, ChangeAlbumTitleDto, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangeAlbumTitleDto) =>
      ALBUM_API.patchAlbums(coupleId, albumId, data),
    onSuccess: () => {
      queryClinet.invalidateQueries([...queryKeys.albumKeys.all, albumId]);
    },
    ...options,
  });
}

export function useDeleteAlbumsMutation({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptions<void, AxiosError, string[], unknown>;
}): UseMutationResult<void, AxiosError, string[], unknown> {
  const queryClinet = useQueryClient();
  const deleteAlbums = async (ids: string[]) => {
    const promises: Promise<AxiosResponse>[] = [];
    ids.forEach((id) => {
      promises.push(ALBUM_API.deleteAlbum(coupleId, id));
    });
    await Promise.all(promises);
  };

  return useMutation({
    mutationFn: (albumIds: string[]) => deleteAlbums(albumIds),
    onSuccess: () => {
      queryClinet.invalidateQueries([...queryKeys.albumKeys.all]);
    },
    ...options,
  });
}

export function useDeletePhotosMutation({
  coupleId,
  albumId,
  options,
}: {
  coupleId: string;
  albumId: string;
  options?: UseMutationOptions<void, AxiosError, string[], unknown>;
}): UseMutationResult<void, AxiosError, string[], unknown> {
  const queryClinet = useQueryClient();
  const deletePhotos = async (ids: string[]) => {
    const promises: Promise<AxiosResponse>[] = [];
    ids.forEach((id) => {
      promises.push(ALBUM_API.deletePhoto(coupleId, albumId, id));
    });
    await Promise.all(promises);
  };

  return useMutation({
    mutationFn: (photoIds: string[]) => deletePhotos(photoIds),
    onSuccess: () => {
      queryClinet.invalidateQueries([...queryKeys.albumKeys.all, albumId]);
    },
    ...options,
  });
}
