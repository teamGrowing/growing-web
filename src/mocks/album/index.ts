import { deleteAlbumHandler } from './deleteAlbumHandler';
import { deletePhotoHandler } from './deletePhotoHandler';
import { getAlbumHandler } from './getAlbumsHandler';
import { getPhotosHandler } from './getPhotosHandler';
import { patchAlbumsHandler } from './patchAlbumsHandler';
import { postAlbumsHandler } from './postAlbumsHandler';
import { postPhotosHandler } from './postPhotosHandler';

export const AlbumHandlers = [
  getAlbumHandler,
  getPhotosHandler,
  postAlbumsHandler,
  postPhotosHandler,
  patchAlbumsHandler,
  deleteAlbumHandler,
  deletePhotoHandler,
];
