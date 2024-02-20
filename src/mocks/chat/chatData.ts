import { ParentChildChattingDto } from 'models/chat';
import { ImgDefaultProfile } from 'assets/image';
import heart from './data/heart.png';
import video from '../gallery/data/video.mp4';
import videoThumbnail from '../gallery/data/videoThumbnail.png';
import cat06 from '../user/data/cat_06.png';
import cat23 from '../user/data/cat_23.png';

export const originData: ParentChildChattingDto[] = [
  {
    parentChatting: {
      id: '1',
      content: '안녕하세용',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: true,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '2',
      content: '방가방가',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: false,
      Writer: {
        id: '2',
        name: '밍지',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '3',
      content:
        '방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: true,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '4',
      content: null,
      emojiUrl: null,
      imageUrls: [heart, heart, heart],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: false,
      Writer: {
        id: '2',
        name: '밍지',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '5',
      content: null,
      emojiUrl: null,
      imageUrls: [ImgDefaultProfile],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: false,
      Writer: {
        id: '2',
        name: '밍지',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '6',
      content: null,
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [
        {
          thumbnailUrl: videoThumbnail,
          videoUrl: video,
          time: 6,
        },
      ],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-02'),
      isMine: true,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '7',
      content: null,
      emojiUrl: cat23,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-02'),
      isMine: true,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '8',
      content: null,
      emojiUrl: cat06,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-02'),
      isMine: true,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
];
