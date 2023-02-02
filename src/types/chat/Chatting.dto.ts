export interface ParentChildChattingDto {
  parentChatting: ChattingDto; // 일반 채팅 및 답장달린 채팅
  childChatting: ChattingDto | null; // 답장 채팅
}

export interface ChattingDto {
  id: string;
  content: string | null;
  emojiUrl: string | null;
  imageUrls: string[]; // 사진, 비디오
  voiceMsgUrls: string[];
  createdAt: Date;
  isMine: boolean;
  Writer: {
    id: string;
    name: string;
    imageUrl: string;
  };
}
