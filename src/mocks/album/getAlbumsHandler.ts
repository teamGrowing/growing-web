import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { AlbumDto } from 'models/gallery';
import image1 from './data/album_image1.jpg';
import image2 from './data/album_image2.jpg';

type Params = {
  coupleId: string;
};

const data: AlbumDto[] = [
  {
    id: '1',
    title: '그로잉',
    subTitle: '민연지주',
    imageUrl: image1,
    createdAt: new Date().toString(),
  },
  {
    id: '2',
    title: '오이라',
    subTitle: '민연지주',
    imageUrl: image2,
    createdAt: new Date().toString(),
  },
  {
    id: '3',
    title: '안농구리',
    subTitle: '안농구리',
    imageUrl: '',
    createdAt: new Date().toString(),
  },
  {
    id: '4',
    title: '앨4',
    subTitle: '섭타4',
    imageUrl: '',
    createdAt: new Date().toString(),
  },
  {
    id: '5',
    title: '앨5',
    subTitle: '섭타5',
    imageUrl: '',
    createdAt: new Date().toString(),
  },
];

export const getAlbumHandler = createApiHandler<
  Params,
  {},
  NullableResponse<AlbumDto[]>
>({
  path: '/couples/:coupleId/gallerys/albums',
  method: 'get',
  requestHandler: () => ({
    200: data,
    400: null,
  }),
});
