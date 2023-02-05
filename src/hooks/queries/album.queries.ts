import { useQuery, QueryKey } from '@tanstack/react-query';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import AlbumDto from '../../types/gallery/Album.dto';
import ALBUM_API from '../../services/album.service';
import { PhotoLineDto } from '../../types/gallery/PhotoLine.dto';

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
    [...queryKeys.albumKeys.all, ...(storeCode ?? [])],
    () => ALBUM_API.getPhotos(coupleId, albumId),
    {
      select: ({ data }) => data,
      ...options,
    }
  );
}
