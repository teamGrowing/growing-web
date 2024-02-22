import {
  getChatsHandler,
  deleteOurChatHandler,
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
} from './chatHandler';
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
