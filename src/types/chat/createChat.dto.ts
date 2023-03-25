export interface CreateChattingDto {
  content: string | null;
  emojiId: string | null;
  imageIds: string[]; // 사진, 비디오
  voiceMsgIds: string[];
  userId: string;
  coupleId: string;
}
