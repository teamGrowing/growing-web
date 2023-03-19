import { Dayjs } from 'dayjs';
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

const Plan = styled.div`
  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.4) 7.3%,
    rgba(243, 129, 129, 0.4) 100%
  );
  color: black;
  border-radius: 20px;
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
  return (
    <Box
      day={date.day()}
      isNotCurrMonth={isNotCurrMonth}
      isClicked={isSelected}
      onClick={onClick}
    >
      <Mark isToday={isToday}>{date.date()}</Mark>
      {data?.map((plan) => (
        <Plan key={plan.id}>{plan.title}</Plan>
      ))}
    </Box>
  );
}

export default DateBox;
