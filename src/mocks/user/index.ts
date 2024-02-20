import { getEmojiDetailHandler } from './getEmojiDetailHandler';
import { getEmojisHandler } from './getEmojisHandler';
import { getUserHandler } from './getUserHandler';
import { patchUserHandler } from './patchUserHandler';
import { putProfilePhotoHandler } from './putProfilePhotoHandler';

export const UserHandlers = [
  getEmojiDetailHandler,
  getEmojisHandler,
  getUserHandler,
  patchUserHandler,
  putProfilePhotoHandler,
];
