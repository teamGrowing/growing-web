import dayjs, { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { useCalendarDailyPlans } from '../../../hooks/queries/calendar.queries';
import store from '../../../stores/RootStore';

const Box = styled.div<{
  day: number;
  isNotCurrMonth?: boolean;
  isClicked?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0px;
  gap: 4px;

  width: 100%;
  height: 80px;
  color: ${({ day, isNotCurrMonth, theme }) => {
    let color = theme.color.gray900;
    if (day === 0 || day === 7) color = '#EA6060';
    if (day === 6) color = '#61B2E4';
    if (isNotCurrMonth) color += '66';
    return color;
  }};
  border-radius: 10px;
  background-color: ${(props) =>
    props.isClicked ? props.theme.color.purple50 : 'none'};

  overflow-y: hidden;
`;

const Mark = styled.div<{ isToday: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;

  width: 14px;
  height: 14px;

  background: ${(props) =>
    props.isToday ? props.theme.color.purple200 : 'transparent'};
  border-radius: 100px;
`;

const Plan = styled.div<{ shape: string }>`
  background: ${({ theme }) => theme.color.pink100};
  color: black;
  border-radius: ${({ shape }) => {
    if (shape === 'ROUND') return '20px';
    if (shape === 'LEFT_ROUND') return '20px 0 0 20px';
    if (shape === 'RIGHT_ROUND') return '0 20px 20px 0';
    return 0;
  }};
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  padding: 2px 4px;

  width: 100%;
  height: 18px;
`;

type DateBoxProps = {
  date: Dayjs;
  isNotCurrMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  onClick: React.MouseEventHandler;
};

function DateBox({
  date,
  isNotCurrMonth,
  isToday,
  isSelected,
  onClick,
}: DateBoxProps) {
  const { data } = useCalendarDailyPlans({
    coupleId: store.userStore.user?.coupleId,
    year: date.format('YYYY'),
    month: date.format('MM'),
    day: date.format('DD'),
  });

  const checkShape = (start: string, end: string) => {
    if (dayjs(start).isSame(date, 'day') && dayjs(end).isSame(date, 'day'))
      return 'ROUND';
    if (dayjs(start).isSame(date, 'day')) return 'LEFT_ROUND';
    if (dayjs(end).isSame(date, 'day')) return 'RIGHT_ROUND';
    return 'NOT_ROUND';
  };

  return (
    <Box
      day={date.day()}
      isNotCurrMonth={isNotCurrMonth}
      isClicked={isSelected}
      onClick={onClick}
    >
      <Mark isToday={isToday}>{date.date()}</Mark>
      {data
        ?.sort((a, b) => {
          return (
            dayjs(b.endAt).date() -
            dayjs(b.startAt).date() -
            (dayjs(a.endAt).date() - dayjs(a.startAt).date())
          );
        })
        .map((plan, idx) => {
          if (idx > 1) return null;
          return (
            <Plan
              key={plan.id}
              className="hidden-scrollbar"
              shape={checkShape(plan.startAt, plan.endAt)}
            >
              {plan.title}
            </Plan>
          );
        })}
    </Box>
  );
}

export default DateBox;
