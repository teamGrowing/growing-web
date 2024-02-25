import { v4 as uuidv4 } from 'uuid';
import Server from 'socket.io-mock';
import SOCKET_KEY from 'constants/socketKeys';
import { ChattingDto, CreateChattingDto } from 'models/chat';
import { ImgDefaultProfile } from 'assets/image';

class MockedSocket {
  private server;

  constructor() {
    this.server = new Server();

    this.server.on('connection', () => {
      console.log('User connected');

      this.server.on('disconnection', () => {
        console.log('User disconnected');
      });

      this.server.on(SOCKET_KEY.CREATE_CHAT, (dto: CreateChattingDto) => {
        console.log('get chat');

        const data: ChattingDto = {
          id: uuidv4(),
          content: dto.content,
          emojiUrl: dto.emojiId && dto.emojiId,
          imageUrls:
            dto.imageIds.length > 0
              ? [ImgDefaultProfile, ImgDefaultProfile, ImgDefaultProfile]
              : [],
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

        this.server.emit(SOCKET_KEY.GET_CHAT, data);
      });
    });

    this.connect();
  }

  private connect() {
    this.server.socketClient.emit('connection');
  }

  public disconnect() {
    this.server.socketClient.emit('disconnection');
  }

  public on(event: string, callback: (res: any) => void) {
    this.server.socketClient.on(event, callback);
  }

  public off(event: string) {
    this.server.socketClient.off(event);
  }

  public emit(event: string, dto: any) {
    this.server.socketClient.emit(event, dto);
  }
}

export const socket = new MockedSocket();
