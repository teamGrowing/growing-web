import {
  NullableResponse,
  createApiHandler,
  getSearchParams,
} from 'mocks/createApiHandler';
import { DailyPlanDto, MonthlyPlanDto } from 'models/plan';
import dayjs from 'dayjs';

type Params = {
  coupleId: string;
};

const data: (DailyPlanDto | MonthlyPlanDto)[] = [
  {
    id: '1',
    title: '여행~',
    startAt: new Date(2024, 1, 4).toUTCString(),
    endAt: new Date(2024, 1, 7).toUTCString(),
    description: '부산 여행',
    location: null,
    alarm: '',
  },
  {
    id: '2',
    title: '민지생일',
    startAt: new Date(2024, 1, 17).toUTCString(),
    endAt: new Date(2024, 1, 17).toUTCString(),
    description: '생일이에요',
    location: null,
    alarm: '',
  },
  {
    id: '3',
    title: '일정입니다!!',
    startAt: new Date(2024, 2, 15).toUTCString(),
    endAt: new Date(2024, 2, 18).toUTCString(),
    description: '일정 설명입니다!',
    location: null,
    alarm: '',
  },
];

export const getPlansHandler = createApiHandler<
  Params,
  {},
  NullableResponse<(DailyPlanDto | MonthlyPlanDto)[]>
>({
  path: '/couples/:coupleId/plans',
  method: 'get',
  requestHandler: (_, request) => {
    const searchParams = getSearchParams(request.url);
    const month = Number(searchParams.get('month'));
    const year = Number(searchParams.get('year'));
    const day = Number(searchParams.get('day'));

    let returnData = data.filter((plan) => {
      const startAt = dayjs(plan.startAt);
      const endAt = dayjs(plan.endAt);

      if (year && month && !day) {
        return startAt.year() === year && startAt.month() + 1 === month;
      }

      if (year && month && day) {
        const currentDate = dayjs(`${year}-${month}-${day}`);
        return (
          (currentDate.isSame(startAt, 'day') ||
            currentDate.isAfter(startAt, 'day')) &&
          (currentDate.isSame(endAt, 'day') ||
            currentDate.isBefore(endAt, 'day'))
        );
      }
      return true;
    });

    if (year && month && !day) {
      returnData = returnData.map((plan) => ({
        id: plan.id,
        title: plan.title,
        startAt: dayjs(plan.startAt).format('YYYY-MM-DD'),
        endAt: dayjs(plan.endAt).format('YYYY-MM-DD'),
      }));
    }

    return {
      200: returnData,
      400: null,
    };
  },
});
