import { CreateAlbumDto } from 'models/gallery';
import { createApiHandler } from 'mocks/createApiHandler';
import { v4 as uuidv4 } from 'uuid';
import { albumsData } from './data';

type Params = {
  coupleId: string;
};

export const postAlbumsHandler = createApiHandler<Params, CreateAlbumDto, null>(
  {
    path: '/couples/:coupleId/gallerys/albums/create',
    method: 'post',
    requestHandler: () => ({
      200: null,
      400: null,
    }),
    onSuccess: async (_, req) => {
      const body = await req.json();
      albumsData.push({
        isDeleted: false,
        id: uuidv4(),
        createdAt: new Date().toUTCString(),
        title: body.title,
        subTitle: body.subTitle,
        imageUrl: '',
      });
    },
  }
);
