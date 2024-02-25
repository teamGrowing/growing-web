/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/no-unresolved
import SOCKET_KEY from 'constants/socketKeys';
import Server from 'socket.io-mock';

class MockedChat {
  constructor() {
    this.server = new Server();
    this.server.on('connection', (_) => {
      console.log('User connected');

      this.server.on('disconnect', () => {
        console.log('User disconnected');
      });

      this.server.on(SOCKET_KEY.CREATE_CHAT, (res) => {
        console.log('get chat');
        this.server.emit(SOCKET_KEY.GET_CHAT, {
          id: 'string',
          content: res,
          emojiUrl: null,
          imageUrls: [], // 사진, 비디오
          videoUrls: [],
          voiceMsgUrls: [],
          createdAt: new Date(),
          isMine: true,
          Writer: {
            id: 'string',
            name: 'string',
            imageUrl: 'string',
          },
        });
      });
    });
  }

  connect() {
    this.server.socketClient.emit('connection');
  }

  disconnect() {
    this.server.socketClient.emit('disconnection');
  }

  on(event, callback) {
    this.server.socketClient.on(event, callback);
  }

  emit(event, dto) {
    this.server.socketClient.emit(event, dto);
  }
}

export const socket = new MockedChat();