import { NullableResponse, createApiHandler } from 'mocks/createApiHandler';
import { AlbumDto } from 'models/gallery';

type Params = {
  coupleId: string;
};

const data: AlbumDto[] = [];

export const getAlbumHandler = createApiHandler<
  Params,
  {},
  NullableResponse<AlbumDto[]>
>('/couples/:coupleId/gallerys/albums', 'get', () => ({
  200: data,
  400: null,
}));
