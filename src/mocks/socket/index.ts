import { v4 as uuidv4 } from 'uuid';
import Server from 'socket.io-mock';
import SOCKET_KEY from 'constants/socketKeys';
import { ImgDefaultProfile } from 'assets/image';
import { ChattingDto, CreateChattingDto } from 'models/chat';
import { addChatData } from '../chat/chatHandler';

class MockedSocket {
  private server;

  private client;

  constructor() {
    this.server = new Server();
    this.client = this.server.socketClient;
    this.initializeDisconnection();
    this.initializeCreateChat();
  }

  private initializeDisconnection() {
    this.server.on('disconnect', () => {
      console.log('User disconnected');
    });
  }

  private initializeCreateChat() {
    this.server.on(SOCKET_KEY.CREATE_CHAT, (dto: CreateChattingDto) => {
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
    this.client.emit('connect');
  }

  disconnect() {
    this.client.emit('disconnect');
  }

  on(event: string, callback: (res: any) => void) {
    this.client.on(event, callback);
  }

  off(event: string) {
    this.client.off(event);
  }

  emit(event: string, dto: any) {
    this.client.emit(event, dto);
  }
}

export const socket = new MockedSocket();
