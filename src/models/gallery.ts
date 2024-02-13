export interface AddPhotoDto {
  imageIds: string[];
}
export interface AlbumDto {
  id: string;
  title: string;
  subTitle: string;
  imageUrl: string;
  createdAt: string;
}

export interface ChangeAlbumTitleDto {
  title?: string;
  subTitle?: string;
}

export interface CreateAlbumDto {
  title: string;
  subTitle: string;
  imageIds: string[];
}

export interface CreatePhotoCommentDto {
  content: string;
}

export interface CreatePhotoResponseDto {
  photoId: string;
}

export interface PhotoDto {
  id: string;
  urls: string;
  videoUrl: string | null;
  createdAt: string;
  name: string;
  time: number | null;
}

export interface PhotoCommentDto {
  id: string;
  content: string;
  createdAt: string;
  name: string;
  isMine: boolean;
}

export interface PhotoLineDto {
  i: string; // photo id
  u: string;
  c: string;
  t: number | null;
}
