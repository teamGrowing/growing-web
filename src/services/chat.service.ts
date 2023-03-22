import fetcher from '.';
import { ChatPhotoDto } from '../types/chat/ChatPhoto.dto';
import { ChatPhotoLineDto } from '../types/chat/ChatPhotoLine.dto';
import { ChattingDto } from '../types/chat/Chatting.dto';
import { ChattingArchivedDto } from '../types/chat/ChattingArchived.dto';
import { CreatePhotoDto } from '../types/chat/CreatePhoto.dto';
import { CreateVoiceMsgDto } from '../types/chat/CreateVoiceMsg.dto';
import { GetDownloadUrlResponseDto } from '../types/chat/GetDownloadUrlResponse.dto';
import { GetUploadUrlRequestDto } from '../types/chat/GetUploadUrlRequest.dto';
import { GetUploadUrlResponseDto } from '../types/chat/GetUploadUrlResponse.dto';
import { Notice } from '../types/chat/Notice';
import { NoticeIsFolden } from '../types/chat/NoticeIsFolden';
import { AnswerDto } from '../types/chat/questions/Answer.dto';
import { IsToDoQuestion } from '../types/chat/questions/IsToDoQuestion';
import { QuestionsAndAnswers } from '../types/chat/questions/QuestionAndAnswers';
import { VoiceMSGDto } from '../types/chat/VoiceMSG.dto';

export const CHAT_API = {
  getChats: (coupleId: string) =>
    fetcher.create().get<ChattingDto[]>(`couples/${coupleId}/chattings`),
  deleteOurChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .delete(`couples/${coupleId}/chattings/${chattingId}/delete-ours`),
  deleteMyChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .delete(`couples/${coupleId}/chattings/${chattingId}/delete-mine`),
};

export const CHAT_NOTICE_API = {
  getNotices: (coupleId: string) =>
    fetcher
      .create()
      .get<Notice | null>(`couples/${coupleId}/chattings/notices`),
  postNotice: (coupleId: string, noticeId: string, data: Notice) =>
    fetcher
      .create()
      .post(`couples/${coupleId}/chattings/${noticeId}/notify`, data),
  postNoticeFold: (coupleId: string, noticeId: string, data: NoticeIsFolden) =>
    fetcher
      .create()
      .post(`couples/${coupleId}/chattings/${noticeId}/fold`, data),
  postNoticeInvisible: (coupleId: string, noticeId: string) =>
    fetcher
      .create()
      .post(`couples/${coupleId}/chattings/${noticeId}/invisible`),
};

export const CHAT_ARCHIVED_API = {
  getArchivedChat: (coupleId: string) =>
    fetcher
      .create()
      .get<ChattingArchivedDto[]>(`couples/${coupleId}/archived-chattings`),
  postArchivedChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .post<ChattingArchivedDto>(
        `couples/${coupleId}/chatting/${chattingId}/archive`
      ),
  deleteArchivedChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .delete<ChattingDto[]>(
        `couples/${coupleId}/archived-chattings/${chattingId}`
      ),
};

export const CHAT_PHOTO_API = {
  getPhotos: (coupleId: string) =>
    fetcher
      .create()
      .get<ChatPhotoLineDto[]>(`couples/${coupleId}/chattings/photos`),
  getPhotoDetail: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .get<ChatPhotoDto>(`couples/${coupleId}/chattings/${chattingId}/photos`),
  postPutGallery: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .post(`couples/${coupleId}/chattings/photos/${photoId}/put-gallery`),
  getDownloadUrl: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .post<GetDownloadUrlResponseDto>(
        `couples/${coupleId}/chattings/photos/${photoId}/get-download-url`
      ),
  getUploadUrl: (
    coupleId: string,
    photoId: string,
    data: GetUploadUrlRequestDto
  ) =>
    fetcher
      .create()
      .post<GetUploadUrlResponseDto>(
        `couples/${coupleId}/chattings/photos/${photoId}/get-upload-url`,
        data
      ),
  createPhoto: (coupleId: string, data: CreatePhotoDto) =>
    fetcher.create().post(`couples/${coupleId}/chattings/photos/create`, data),
};

export const CHAT_VOICE_API = {
  getVoices: (coupleId: string) =>
    fetcher.create().get(`couples/${coupleId}/chattings/voice-messages`),
  getUploadUrl: (coupleId: string, data: GetUploadUrlRequestDto) =>
    fetcher
      .create()
      .post<GetUploadUrlResponseDto>(
        `couples/${coupleId}/chattings/voice-messages/get-upload-url`,
        data
      ),
  createPhoto: (coupleId: string, data: CreateVoiceMsgDto) =>
    fetcher
      .create()
      .post<VoiceMSGDto>(
        `couples/${coupleId}/chattings/voice-messages/create`,
        data
      ),
  getDownloadUrl: (coupleId: string) =>
    fetcher
      .create()
      .post<GetDownloadUrlResponseDto>(
        `couples/${coupleId}/chattings/voice-messages/get-download-url`
      ),
};

export const CHAT_QNA_API = {
  getQuestions: (coupleId: string) =>
    fetcher
      .create()
      .get<QuestionsAndAnswers[]>(`couples/${coupleId}/questions?to-do=false`),
  getHasToDoQuestions: (coupleId: string) =>
    fetcher
      .create()
      .get<IsToDoQuestion>(`couples/${coupleId}/questions?to-do=true`),
  postQuestions: (coupleId: string, questionId: string, data: AnswerDto) =>
    fetcher
      .create()
      .post<QuestionsAndAnswers>(
        `couples/${coupleId}/questions/${questionId}/answer`,
        data
      ),
};
