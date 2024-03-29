import {
  CreatePhotoCommentDto,
  PhotoDto,
  PhotoCommentDto,
  PhotoLineDto,
} from 'models/gallery';
import {
  CreatePhotoRequestDto,
  GetDownloadUrlResponseDto,
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
} from 'models/chat';
import fetcher from './fetcher';

export const GALLERY_API = {
  getPhotos: (coupleId: string, params?: { base: number; limit: number }) =>
    fetcher
      .create()
      .get<PhotoLineDto[]>(`couples/${coupleId}/gallerys/photos`, { params }),
  getPhotoDetail: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .get<PhotoDto>(`couples/${coupleId}/gallerys/photos/${photoId}`),
  getUploadUrl: (coupleId: string, data: GetUploadUrlRequestDto) =>
    fetcher
      .create()
      .post<GetUploadUrlResponseDto>(
        `couples/${coupleId}/gallerys/photos/get-upload-url`,
        data
      ),
  createPhoto: (coupleId: string, data: CreatePhotoRequestDto) =>
    fetcher.create().post(`couples/${coupleId}/gallerys/photos/create`, data),
  getDownloadUrl: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .post<GetDownloadUrlResponseDto>(
        `couples/${coupleId}/gallerys/photos/${photoId}/get-download-url`
      ),
  deletePhoto: (coupleId: string, photoId: string) =>
    fetcher.create().delete(`couples/${coupleId}/gallerys/photos/${photoId}`),

  upLoadPhoto: (url: string, file: File) =>
    fetcher.create().put(url, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export const GALLERY_COMMENT_API = {
  getComments: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .get<PhotoCommentDto[]>(
        `couples/${coupleId}/gallerys/photos/${photoId}/comments`
      ),
  postComment: (
    coupleId: string,
    photoId: string,
    data: CreatePhotoCommentDto
  ) =>
    fetcher
      .create()
      .post<PhotoCommentDto>(
        `couples/${coupleId}/gallerys/photos/${photoId}/comments/create`,
        data
      ),
  deleteComment: (coupleId: string, photoId: string, commentId: string) =>
    fetcher
      .create()
      .delete(
        `couples/${coupleId}/gallerys/photos/${photoId}/comments/${commentId}`
      ),
};
