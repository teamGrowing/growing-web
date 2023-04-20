export interface ChatPhotoDto {
  id: string; // chatting id
  createdAt: string;
  name: string;
  photos: PhotoDto[];
  video: VideoDto;
}

interface PhotoDto {
  id: string;
  url: string;
}

export interface VideoDto {
  id: string;
  thumbnailUrl: string;
  time: number;
  videoUrl: string;
}
