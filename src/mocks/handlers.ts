import { AlbumHandlers } from './album';
import { ChatHandlers } from './chat';
import { CoupleHandlers } from './couple';
import { GalleryHandlers } from './gallery';
import { NoticeHandlers } from './notice';
import { PetHandlers } from './pet';
import { UserHandlers } from './user';

export const handlers = [
  ...AlbumHandlers,
  ...ChatHandlers,
  ...UserHandlers,
  ...PetHandlers,
  ...CoupleHandlers,
  ...GalleryHandlers,
  ...NoticeHandlers,
];
