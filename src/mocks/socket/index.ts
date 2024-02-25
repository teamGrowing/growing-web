import { v4 as uuidv4 } from 'uuid';
import Server from 'socket.io-mock';
import SOCKET_KEY from 'constants/socketKeys';
import { ImgDefaultProfile } from 'assets/image';
import { ChattingDto, CreateChattingDto } from 'models/chat';
import { addChatData } from '../chat/chatHandler';

class MockedSocket {
  private server;

  constructor() {
    this.server = new Server();
    this.initializeListeners();
    this.connect();
  }

  private initializeListeners() {
    this.server.on('connection', () => {
      console.log('User connected');
      this.initializeDisconnection();
      this.initializeCreateChat();
    });
  }

  private initializeDisconnection() {
    this.server.on('disconnection', () => {
      console.log('User disconnected');
    });
  }

  private initializeCreateChat() {
    this.server.on(SOCKET_KEY.CREATE_CHAT, (dto: CreateChattingDto) => {
      console.log('get chat');
      const data = this.createChatData(dto);
      addChatData(data);
      this.server.emit(SOCKET_KEY.GET_CHAT, data);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private createChatData(dto: CreateChattingDto): ChattingDto {
    return {
      id: uuidv4(),
      content: dto.content,
      emojiUrl: dto.emojiId || null,
      imageUrls: Array(dto.imageIds.length).fill(ImgDefaultProfile),
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date(),
      isMine: true,
      Writer: {
        id: '1',
        name: '연주',
        imageUrl: ImgDefaultProfile,
      },
    };
  }

  connect() {
    this.server.socketClient.emit('connection');
  }

  disconnect() {
    this.server.socketClient.emit('disconnection');
  }

  on(event: string, callback: (res: any) => void) {
    this.server.socketClient.on(event, callback);
  }

  off(event: string) {
    this.server.socketClient.off(event);
  }

  emit(event: string, dto: any) {
    this.server.socketClient.emit(event, dto);
  }
}

export const socket = new MockedSocket();
