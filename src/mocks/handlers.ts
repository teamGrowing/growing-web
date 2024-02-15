import { AlbumHandlers } from './album';
import { ChatHandlers } from './chat';
import { CoupleHandlers } from './couple';
import { PetHandlers } from './pet';
import { UserHandlers } from './user';

export const handlers = [
  ...AlbumHandlers,
  ...ChatHandlers,
  ...UserHandlers,
  ...PetHandlers,
  ...CoupleHandlers,
];
