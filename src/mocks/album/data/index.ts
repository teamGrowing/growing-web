import { AlbumDto } from 'models/gallery';
import image1 from './album_image1.jpg';
import image2 from './album_image2.jpg';

interface AlbumDtoWithDeletedSign extends AlbumDto {
  isDeleted: boolean;
}

export const albumsData: AlbumDtoWithDeletedSign[] = [
  {
    id: '1',
    title: '그로잉',
    subTitle: '민연지주',
    imageUrl: image1,
    createdAt: new Date().toString(),
    isDeleted: false,
  },
  {
    id: '2',
    title: '오이라',
    subTitle: '민연지주',
    imageUrl: image2,
    createdAt: new Date().toString(),
    isDeleted: false,
  },
  {
    id: '3',
    title: '안농구리',
    subTitle: '안농구리',
    imageUrl: image1,
    createdAt: new Date().toString(),
    isDeleted: false,
  },
  {
    id: '4',
    title: '앨4',
    subTitle: '섭타4',
    imageUrl: image1,
    createdAt: new Date().toString(),
    isDeleted: false,
  },
  {
    id: '5',
    title: '앨5',
    subTitle: '섭타5',
    imageUrl: image2,
    createdAt: new Date().toString(),
    isDeleted: false,
  },
];
