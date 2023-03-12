import { QueryKey } from '@tanstack/react-query';

const Domain = {
  user: 'USER',
  couple: 'COUPLE',
  pet: 'PET',
  chat: 'CHAT',
  plan: 'PLAN',
  gallery: 'GALLERY',
  album: 'ALBUM',
  calendar: 'CALENDAR',
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
};

const calendarKeys = {
  all: [Domain.calendar] as unknown as QueryKey[],
  plan: [Domain.calendar, 'plan'] as unknown as QueryKey[],
  byMonth: (year: string, month: string) =>
    [...calendarKeys.plan, year, month] as unknown as QueryKey[],
  byDay: (year: string, month: string, day: string) =>
    [...calendarKeys.plan, year, month, day] as unknown as QueryKey[],
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
  galleryKeys,
  albumKeys,
  calendarKeys,
};

export default queryKeys;
