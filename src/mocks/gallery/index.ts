import { getPhotosHandler } from './getPhotosHandler';
import { getPhotoDetailHandler } from './getPhotoDetailHandler';
import { getUploadUrlHandler } from './getUploadUrlHandler';
import { getDownloadUrlHandler } from './getDownloadUrlHandler';
import { createPhotoHandler } from './createPhotoHandler';
import { deletePhotoHandler } from './deletePhotoHandler';
import { getCommentsHandler } from './getCommentsHandler';
import { postCommentHandler } from './postCommentHandler';
import { deleteCommentHandler } from './deleteCommentHandler';
import { upLoadPhotoHandler } from './uploadPhotoHandler';

export const GalleryHandlers = [
  getPhotosHandler,
  getPhotoDetailHandler,
  getUploadUrlHandler,
  createPhotoHandler,
  getDownloadUrlHandler,
  deletePhotoHandler,
  getCommentsHandler,
  postCommentHandler,
  deleteCommentHandler,
  upLoadPhotoHandler,
];
