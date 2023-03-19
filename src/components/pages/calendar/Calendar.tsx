import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCalendarDailyPlans } from '../../../hooks/queries/calendar.queries';
import store from '../../../stores/RootStore';
import Icon from '../../common/Icon/Icon';
import BottomSheetMenu from '../../common/Modal/ModalBottomSheet/BottomSheetMenu';
import ModalBottomSheet from '../../common/Modal/ModalBottomSheet/ModalBottomSheet';
import DateBox from './DateBox';

const DayContainer = styled.div`
  display: grid;
  width: 100%;
  height: 51px;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  padding: 29px 0 8px 0;
  font-size: 12px;
  box-sizing: border-box;
  border-bottom: 1px solid;
  border-image-source: ${({ theme }) => theme.color.gradient400};
  border-image-slice: 20;
`;

const DayBox = styled.div<{ day: number }>`
  height: 14px;
  font-family: 'PretendardLight';
  font-size: 12px;
  line-height: 14px;
  color: ${({ day }) => {
    if (day === 0 || day === 7) return '#EA6060';
    if (day === 6) return '#61B2E4';
    return 'black';
  }};
`;

const DateContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  font-size: 12px;
`;

// for todos
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
  align-items: flex-start;
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

const Input = styled.input`
  background-color: ${({ theme }) => theme.color.gray200};
  border-radius: 10px;
  height: 20px;
  padding: 2px 5px;
`;

type CalendarProps = {
  year: number;
  month: number;
  clickedDate: Dayjs;
};

const week = ['일', '월', '화', '수', '목', '금', '토'];

function Calendar({ year, month, clickedDate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(clickedDate);
  const [onBottomSheetMenu, setOnBottomSheetMenu] = useState(false);
  const { data } = useCalendarDailyPlans({
    coupleId: store.userStore.user?.coupleId!,
    year: selectedDate?.format('YYYY'),
    month: selectedDate?.format('MM'),
    day: selectedDate?.format('DD'),
  });

  const start = dayjs(new Date(year, month, 0));
  const startDate = start.date();
  const startDay = start.day();
  const end = dayjs(new Date(year, month + 1, 0));
  const endDate = end.date();
  const endDay = end.day();

  const dates: number[] = [];
  for (let i = 0; i <= startDay; i += 1) dates.push(startDate - (startDay - i));
  for (let i = 1; i <= endDate; i += 1) dates.push(i);
  for (let i = 0; endDay + i + 1 < 7; i += 1) dates.push(i + 1);

  useEffect(() => {
    if (clickedDate.isSame(dayjs(), 'day')) setSelectedDate(clickedDate);
  }, [clickedDate]);

  return (
    <>
      <DayContainer>
        {week.map((day, idx) => (
          <DayBox key={day} day={idx}>
            {day}
          </DayBox>
        ))}
      </DayContainer>
      <DateContainer>
        {dates.map((date, idx) => {
          let blockDate = dayjs(new Date(year, month, date));
          if (idx <= startDay)
            blockDate = dayjs(new Date(year, month - 1, date));
          if (idx > startDay + endDate)
            blockDate = dayjs(new Date(year, month + 1, date));
          return (
            <DateBox
              key={`day-${blockDate.year()}-${blockDate.month()}-${blockDate.date()}`}
              date={blockDate}
              isNotCurrMonth={idx <= startDay || idx > startDay + endDate}
              isToday={blockDate.isSame(dayjs(), 'day')}
              isSelected={dayjs(selectedDate).isSame(blockDate, 'day')}
              onClick={() => setSelectedDate(blockDate)}
            />
          );
        })}
      </DateContainer>
      <Container>
        <TodoTitle>
          <div className="text-gradient400">Todo</div>
          <Icon icon="IconPlus" onClick={() => setOnBottomSheetMenu(true)} />
        </TodoTitle>
        <Todos className="hidden-scrollbar">
          {data?.map((plan) => (
            <Todo key={plan.id}>{plan.title}</Todo>
          ))}
        </Todos>
      </Container>
      <ModalBottomSheet open={onBottomSheetMenu} setOpen={setOnBottomSheetMenu}>
        <BottomSheetMenu>
          제목
          <Input type="text" />
        </BottomSheetMenu>
        <BottomSheetMenu>시작시간</BottomSheetMenu>
        <BottomSheetMenu>종료시간</BottomSheetMenu>
        <BottomSheetMenu>위치</BottomSheetMenu>
        <BottomSheetMenu>알림설정</BottomSheetMenu>
        <BottomSheetMenu>설명</BottomSheetMenu>
      </ModalBottomSheet>
    </>
  );
}
export default Calendar;
