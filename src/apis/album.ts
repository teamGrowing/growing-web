import { AddPhotoDto } from 'types/gallery/AddPhoto.dto';
import AlbumDto from 'types/gallery/Album.dto';
import { ChangeAlbumTitleDto } from 'types/gallery/ChangeAlbumTitle.dto';
import { CreateAlbumDto } from 'types/gallery/CreateAlbum.dto';
import { PhotoLineDto } from 'types/gallery/PhotoLine.dto';
import fetcher from './fetcher';

const ALBUM_API = {
  getAlbums: (coupleId: string) =>
    fetcher.create().get<AlbumDto[]>(`couples/${coupleId}/gallerys/albums`),
  getPhotos: (coupleId: string, albumId: string) =>
    fetcher
      .create()
      .get<PhotoLineDto[]>(
        `couples/${coupleId}/gallerys/albums/${albumId}/photos`
      ),

  postAlbums: (coupleId: string, data: CreateAlbumDto) =>
    fetcher.create().post(`couples/${coupleId}/gallerys/albums/create`, data),
  postPhotos: (coupleId: string, albumId: string, data: AddPhotoDto) =>
    fetcher
      .create()
      .post(
        `couples/${coupleId}/gallerys/albums/${albumId}/photos/create`,
        data
      ),

  patchAlbums: (coupleId: string, albumId: string, data: ChangeAlbumTitleDto) =>
    fetcher
      .create()
      .patch(
        `couples/${coupleId}/gallerys/albums/${albumId}/change-title`,
        data
      ),

  deleteAlbum: (coupleId: string, albumId: string) =>
    fetcher.create().delete(`couples/${coupleId}/gallerys/albums/${albumId}`),
  deletePhoto: (coupleId: string, albumId: string, photoId: string) =>
    fetcher
      .create()
      .delete(
        `couples/${coupleId}/gallerys/albums/${albumId}/photos/${photoId}`
      ),
};

export default ALBUM_API;
