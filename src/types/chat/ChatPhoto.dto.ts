export interface ChatPhotoDto {
  id: string; // chatting id
  createdAt: string;
  name: string;
  photos: {
    id: string;
    url: string;
  };
}
