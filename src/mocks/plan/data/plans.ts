import { DailyPlanDto } from 'models/plan';

interface DailyPlanWithDeletedSign extends DailyPlanDto {
  isDeleted: boolean;
}

export const plansData: DailyPlanWithDeletedSign[] = [
  {
    id: '1',
    title: '여행~',
    startAt: new Date(2024, 1, 4).toUTCString(),
    endAt: new Date(2024, 1, 7).toUTCString(),
    description: '부산 여행',
    location: null,
    alarm: '',
    isDeleted: false,
  },
  {
    id: '2',
    title: '민지생일',
    startAt: new Date(2024, 1, 17).toUTCString(),
    endAt: new Date(2024, 1, 17).toUTCString(),
    description: '생일이에요',
    location: null,
    alarm: '',
    isDeleted: false,
  },
  {
    id: '3',
    title: '일정입니다!!',
    startAt: new Date(2024, 2, 15).toUTCString(),
    endAt: new Date(2024, 2, 18).toUTCString(),
    description: '일정 설명입니다!',
    location: null,
    alarm: '',
    isDeleted: false,
  },
];
