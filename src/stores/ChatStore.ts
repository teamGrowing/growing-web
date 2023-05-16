import { makeAutoObservable } from 'mobx';
import { ParentChildChattingDto } from 'types/chat/Chatting.dto';

const CHAT_MODE = {
  Default: 'Default',
  Reply: 'Reply',
  Context: 'Context',
  longChat: 'LongChat',
  Menu: 'Menu',
  Gallery: 'Gallery',
  GalleryAll: 'GalleryAll',
  Camera: 'Camera',
  Voice: 'Voice',
  Map: 'Map',
  Emoji: 'Emoji',
} as const;
export type ChatType = typeof CHAT_MODE[keyof typeof CHAT_MODE];

export const plusMenuProps: ChatType[] = [
  'Menu',
  'Gallery',
  'Camera',
  'Voice',
  'Map',
  'Emoji',
];

type Mode = {
  mode: ChatType;
  chat?: ParentChildChattingDto;
};

class ChatStore {
  chatMode: Mode = {
    mode: 'Default',
  };

  scrollHeight: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setChatMode(data: Mode) {
    this.chatMode = data;
  }

  setScrollHeight(n: number | null) {
    this.scrollHeight = n;
  }

  clear() {
    this.chatMode = {
      mode: 'Default',
      chat: undefined,
    };
  }

  exitChatRoom() {
    this.chatMode = {
      mode: 'Default',
      chat: undefined,
    };
    this.scrollHeight = null;
  }
}

const chatStore = new ChatStore();

export default chatStore;
