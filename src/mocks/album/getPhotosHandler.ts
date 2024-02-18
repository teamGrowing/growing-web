import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { PhotoLineDto } from 'models/gallery';
import image1 from './data/album_image1.jpg';
import image2 from './data/album_image2.jpg';

type Params = {
  coupleId: string;
};

const data: PhotoLineDto[] = [
  {
    i: '1',
    u: image1,
    c: 'c',
    t: null,
  },
  {
    i: '2',
    u: image2,
    c: 'c',
    t: null,
  },
  {
    i: '3',
    u: image1,
    c: 'c',
    t: null,
  },
  {
    i: '4',
    u: image2,
    c: 'c',
    t: null,
  },
  {
    i: '5',
    u: image1,
    c: 'c',
    t: null,
  },
  {
    i: '6',
    u: image2,
    c: 'c',
    t: null,
  },
  {
    i: '7',
    u: image1,
    c: 'c',
    t: null,
  },
  {
    i: '8',
    u: image2,
    c: 'c',
    t: null,
  },
  {
    i: '9',
    u: image1,
    c: 'c',
    t: null,
  },
  {
    i: '10',
    u: image2,
    c: 'c',
    t: null,
  },
  {
    i: '11',
    u: image1,
    c: 'c',
    t: null,
  },
  {
    i: '12',
    u: image2,
    c: 'c',
    t: null,
  },
];

export const getPhotosHandler = createApiHandler<
  Params,
  {},
  NullableResponse<PhotoLineDto[]>
>('/couples/:coupleId/gallerys/photos', 'get', () => ({
  200: data,
  400: null,
}));
