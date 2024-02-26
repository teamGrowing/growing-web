import {
  NullableResponse,
  createApiHandler,
  getSearchParams,
} from 'mocks/createApiHandler';
import { DailyPlanDto, MonthlyPlanDto } from 'models/plan';
import dayjs from 'dayjs';
import { plansData } from './data/plans';

type Params = {
  coupleId: string;
};

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

    let returnData: (DailyPlanDto | MonthlyPlanDto)[] = plansData.filter(
      (plan) => {
        if (plan.isDeleted) return false;

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
      }
    );

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
