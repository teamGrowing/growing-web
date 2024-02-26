import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { CreatePhotoRequestDto } from 'models/chat';
import { CreatePhotoResponseDto } from 'models/gallery';
import { v4 as uuidv4 } from 'uuid';
import { photoData } from './data/data';
import image1 from './data/album_image2.jpg';

type Params = {
  coupleId: string;
};

const data: CreatePhotoResponseDto = {
  photoId: 'photo-id',
};

export const createPhotoHandler = createApiHandler<
  Params,
  CreatePhotoRequestDto,
  NullableResponse<CreatePhotoResponseDto>
>({
  path: '/couples/:coupleId/gallerys/photos/create',
  method: 'post',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
  onSuccess: () => {
    photoData.push({
      isDeleted: false,
      id: uuidv4(),
      urls: image1,
      videoUrl: null,
      createdAt: new Date().toUTCString(),
      name: 'photo-name',
      time: null,
    });
  },
});
