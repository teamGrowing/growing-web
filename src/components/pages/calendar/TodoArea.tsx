import { Dayjs } from 'dayjs';
import { observer } from 'mobx-react';
import { useState } from 'react';
import styled from 'styled-components';
import { MENT_CALENDAR } from '../../../constants/ments';
import useToast from '../../../hooks/common/useToast';
import {
  useCalendarDailyPlans,
  useDeletePlanMutation,
} from '../../../hooks/queries/calendar.queries';
import store from '../../../stores/RootStore';
import { DailyPlanDto } from '../../../types/plan/DailyPlan.dto';
import Icon from '../../common/Icon/Icon';
import CalendarBottomSheet from './CalendarBottomSheet';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: calc(100% - 535px);
  min-height: 250px;
`;

const TodoTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  padding: 0 7px;
  gap: 10px;

  width: 290px;
  height: 23px;
  flex-grow: 0;
`;

const Todos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 20px;
  gap: 10px;

  width: 290px;

  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.2) 7.3%,
    rgba(243, 129, 129, 0.2) 100%
  );
  border-radius: 30px 30px 0 0;
  min-height: 200px;
  overflow-y: scroll;
  flex-grow: 1;
`;

const Todo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  gap: 10px;

  width: 250px;
  height: 25px;

  background: ${({ theme }) => theme.color.gray50};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 30px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  font-family: 'PretendardLight';
  font-size: 14px;
  line-height: 17px;
`;

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
    <Container>
      <TodoTitle>
        <div className="text-gradient400">Todo</div>
        <Icon icon="IconPlus" onClick={() => setOnBottomSheet(true)} />
      </TodoTitle>
      <Todos className="hidden-scrollbar">
        {dailyPlans?.map((plan) => (
          <Todo
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
          </Todo>
        ))}
      </Todos>
      <CalendarBottomSheet
        onClose={() => setSelectedTodoData(null)}
        open={onBottomSheet}
        setOpen={setOnBottomSheet}
        selectedDate={date}
        defaultData={selectedTodoData ?? undefined}
      />
    </Container>
  );
}
export default observer(TodoArea);
