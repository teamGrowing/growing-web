export interface ChatPhotoDto {
  id: string; // chatting id
  createdAt: string;
  name: string;
  photos: PhotoDto[];
}

interface PhotoDto {
  id: string;
  url: string;
}
