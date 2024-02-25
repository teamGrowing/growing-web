import {
  getChatsHandler,
  deleteOurChatHandler,
  getPhotosHandler,
  getPhotoDetailHandler,
  postPutGalleryHandler,
  getUploadUrlHandler,
  createPhotoHandler,
} from './chatHandler';
import {
  getArchivedChatHandler,
  postArchivedChatHandler,
  deleteArchivedChatHandler,
} from './chatArcivedHandler';
import {
  getNoticesHandler,
  postNoticeHandler,
  postNoticeFoldHandler,
  postNoticeInvisibleHandler,
} from './chatNoticeHandler';
import {
  getQuestionsHandler,
  postQuestionsHandler,
} from './chatQuestionHandler';

export const ChatHandlers = [
  deleteOurChatHandler,
  getChatsHandler,
  getNoticesHandler,
  postNoticeHandler,
  postNoticeFoldHandler,
  postNoticeInvisibleHandler,
  getArchivedChatHandler,
  postArchivedChatHandler,
  deleteArchivedChatHandler,
  getPhotosHandler,
  getPhotoDetailHandler,
  postPutGalleryHandler,
  getUploadUrlHandler,
  createPhotoHandler,
  getQuestionsHandler,
  postQuestionsHandler,
];
