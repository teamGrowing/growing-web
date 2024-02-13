import { Dayjs } from 'dayjs';
import { observer } from 'mobx-react';
import { useState } from 'react';
import { MENT_CALENDAR } from 'constants/ments';
import useToast from 'hooks/common/useToast';
import { useCalendarDailyPlans, useDeletePlanMutation } from 'hooks/queries';
import store from 'stores/RootStore';
import { DailyPlanDto } from 'types/plan/DailyPlan.dto';
import Icon from 'components/common/Icon/Icon';
import CalendarBottomSheet from '../CalendarBottomSheet/CalendarBottomSheet';
import * as S from './TodoArea.styled';

type TodoProps = {
  date: Dayjs;
};

function TodoArea({ date }: TodoProps) {
  const [onBottomSheet, setOnBottomSheet] = useState<boolean>(false);
  const [selectedTodoData, setSelectedTodoData] = useState<DailyPlanDto | null>(
    null
  );
  const { addToast } = useToast();
  const { data: dailyPlans } = useCalendarDailyPlans({
    coupleId: store.userStore.user?.coupleId!,
    year: date.format('YYYY'),
    month: date.format('MM'),
    day: date.format('DD'),
  });

  const { mutate: deletePlan } = useDeletePlanMutation({
    coupleId: store.userStore.user?.coupleId!,
  });

  return (
    <S.Container>
      <S.TodoTitle>
        <div className="text-gradient400">Todo</div>
        <Icon icon="IconPlus" onClick={() => setOnBottomSheet(true)} />
      </S.TodoTitle>
      <S.Todos className="hidden-scrollbar">
        {dailyPlans?.map((plan) => (
          <S.Todo
            key={plan.id}
            onClick={() => {
              setOnBottomSheet(true);
              setSelectedTodoData(plan);
            }}
          >
            {plan.title}
            <Icon
              icon="IconTrash"
              width={15}
              height={15}
              onClick={(e) => {
                deletePlan(plan.id, {
                  onSuccess: () => addToast(MENT_CALENDAR.PLAN_DELETE_SUCCESS),
                });
                e.stopPropagation();
              }}
            />
          </S.Todo>
        ))}
      </S.Todos>
      <CalendarBottomSheet
        onClose={() => setSelectedTodoData(null)}
        open={onBottomSheet}
        setOpen={setOnBottomSheet}
        selectedDate={date}
        defaultData={selectedTodoData ?? undefined}
      />
    </S.Container>
  );
}
export default observer(TodoArea);
