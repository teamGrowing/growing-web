import { getUserHandler } from './getUserHandler';
import { patchUserHandler } from './patchUserHandler';
import { putProfilePhotoHandler } from './putProfilePhotoHandler';

export const UserHandlers = [
  getUserHandler,
  patchUserHandler,
  putProfilePhotoHandler,
];
