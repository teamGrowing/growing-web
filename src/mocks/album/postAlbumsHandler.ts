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
    subTitle: '민지와연주',
    imageUrl: image1,
    createdAt: new Date().toString(),
  },
  {
    id: '2',
    title: '오이라',
    subTitle: '동아리',
    imageUrl: image2,
    createdAt: new Date().toString(),
  },
  {
    id: '3',
    title: '추억',
    subTitle: '추억이야~',
    imageUrl: image1,
    createdAt: new Date().toString(),
  },
  {
    id: '4',
    title: '기본앨범',
    subTitle: '',
    imageUrl: '',
    createdAt: new Date().toString(),
  },
  {
    id: '5',
    title: '내얼굴',
    subTitle: 'ㅎㅎ',
    imageUrl: '',
    createdAt: new Date().toString(),
  },
];

export const getAlbumHandler = createApiHandler<
  Params,
  {},
  NullableResponse<AlbumDto[]>
>('/couples/:coupleId/gallerys/albums', 'get', () => ({
  200: data,
  400: null,
}));
