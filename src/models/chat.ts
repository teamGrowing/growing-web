export interface ChatPhotoDto {
  id: string; // chatting id
  createdAt: string;
  name: string;
  photos: PhotoDto[];
  video: VideoDto;
}

interface PhotoDto {
  id: string;
  url: string;
}

export interface VideoDto {
  id: string;
  thumbnailUrl: string;
  time: number;
  videoUrl: string;
}

export interface ChatPhotoLineDto {
  i: string; // chatting id
  u: string[]; // 최대 두개만 준다.
  c: string;
  t: number | null;
}

export interface ChatRequestDto {
  base: number;
  limit: number;
  offset: number;
}

export interface ParentChildChattingDto {
  parentChatting: ChattingDto; // 일반 채팅 및 답장달린 채팅
  childChatting: ChattingDto | null; // 답장 채팅
}

export interface ChattingDto {
  id: string;
  content: string | null;
  emojiUrl: string | null;
  imageUrls: string[]; // 사진, 비디오
  videoUrls: { thumbnailUrl: string; videoUrl: string; time: number }[];
  voiceMsgUrls: { url: string; time: number }[];
  createdAt: Date;
  isMine: boolean;
  Writer: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

export interface ChattingArchivedDto {
  chattingId: string;
  content: string;
  writerName: string;
  writedAt: Date;
  archivedAt: Date;
}

export interface CreateChattingDto {
  content: string | null;
  emojiId: string | null;
  imageIds: string[]; // 사진, 비디오
  voiceMsgIds: string[];
  userId: string;
  coupleId: string;
}

export interface CreatePhotoRequestDto {
  s3Path: string;
  time: number | null;
}

export interface CreatePhotoResponseDto {
  photoId: string;
  videoId: string | null;
}

export interface CreateVoiceMsgDto {
  s3Path: string;
  chattingId: string;
  time: number;
}

export interface EnterChattingRoomDto {
  coupleId: string;
  userId: string;
}

export interface GetDownloadUrlResponseDto {
  url: string;
}

export interface GetUploadUrlRequestDto {
  name: string;
}

export interface GetUploadUrlResponseDto {
  url: string;
  s3Path: string;
}

export interface Notice {
  id: string;
  content: string;
  announcer: string;
  isFolden: boolean;
}

export interface NoticeIsFolden {
  result: boolean; // true: 접힌거, false: 열린거
}

export interface RoomInfo {
  id: string; // socket ID
  room: string; // 참가한 채팅방 -> coupleId로 했음
}

export interface VoiceMSGDto {
  id: string;
  createdAt: string;
  name: string;
  time: number;
}
