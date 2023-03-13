import { QueryKey } from '@tanstack/react-query';

const Domain = {
  user: 'USER',
  couple: 'COUPLE',
  pet: 'PET',
  chat: 'CHAT',
  qna: 'QNA',
  plan: 'PLAN',
  gallery: 'GALLERY',
  album: 'ALBUM',
};

const userKeys = {
  all: [Domain.user] as unknown as QueryKey[],
};

const coupleKeys = {
  all: [Domain.couple] as unknown as QueryKey[],
};

const petKeys = {
  all: [Domain.pet] as unknown as QueryKey[],
};

const chatKeys = {
  all: [Domain.chat] as unknown as QueryKey[],
  notice: [Domain.chat, 'notice'] as unknown as QueryKey[],
};

const qnaKeys = {
  all: [Domain.qna] as unknown as QueryKey[],
  hasTodo: [Domain.qna, 'todo'] as unknown as QueryKey[],
};

const galleryKeys = {
  all: [Domain.gallery as unknown as QueryKey] as QueryKey[],
  list: () => [...galleryKeys.all, 'list'] as unknown as QueryKey[],
  byId: (id: string) => [...galleryKeys.all, id] as unknown as QueryKey[],
  commentById: (id: string) =>
    [...galleryKeys.all, 'comment', id] as unknown as QueryKey[],
};

const albumKeys = {
  all: [Domain.album as unknown as QueryKey] as QueryKey[],
  byId: (id: string) => [...albumKeys.all, id] as unknown as QueryKey[],
};

const queryKeys = {
  userKeys,
  coupleKeys,
  petKeys,
  chatKeys,
  qnaKeys,
  galleryKeys,
  albumKeys,
};

export default queryKeys;
