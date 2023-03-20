import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  useAddPlanMutation,
  useCalendarDailyPlans,
  useDeletePlanMutation,
} from '../../../hooks/queries/calendar.queries';
import store from '../../../stores/RootStore';
import MyCalendar from '../../../util/Calendar';
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

const Input = styled.input`
  background-color: ${({ theme }) => theme.color.gray200};
  border-radius: 10px;
  height: 30px;
  padding: 2px 5px;
`;

const SheetContainer = styled.div`
  display: flex;

  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ToggleSwitch = styled.div<{ isTrue: boolean }>`
  width: 40px;
  height: 20px;
  display: block;
  position: relative;
  border-radius: 30px;
  background-color: ${({ isTrue }) => (isTrue ? 'white' : '#d9d9d9')};
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;
`;

const ToggleBtn = styled.div<{ isTrue: boolean }>`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  ${({ isTrue }) =>
    isTrue
      ? css`
          left: 4px;
        `
      : css`
          right: 4px;
        `};
  transform: translateY(-50%);
  border-radius: 50%;
  background-color: ${({ isTrue }) => (isTrue ? '#d9d9d9' : 'white')};
`;
const Button = styled.button`
  margin: 0 auto;

  background-color: white;
  height: 40px;
  width: 150px;
  border-radius: 10px;
`;
type CalendarProps = {
  year: number;
  month: number;
  clickedDate: Dayjs;
};

function Calendar({ year, month, clickedDate }: CalendarProps) {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  // const startInputRef = useRef<HTMLInputElement | null>(null);
  // const endInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(clickedDate);
  const [onBottomSheetMenu, setOnBottomSheetMenu] = useState(false);
  const [toggleState, setToggleState] = useState(false);
  const { data } = useCalendarDailyPlans({
    coupleId: store.userStore.user?.coupleId!,
    year: selectedDate?.format('YYYY'),
    month: selectedDate?.format('MM'),
    day: selectedDate?.format('DD'),
  });
  const { mutate: addPlan } = useAddPlanMutation({
    coupleId: store.userStore.user?.coupleId!,
  });
  const { mutate: deletePlan } = useDeletePlanMutation({
    coupleId: store.userStore.user?.coupleId!,
  });

  const calendar = new MyCalendar(year, month);
  const dates: number[] = calendar.getDates();

  useEffect(() => {
    if (clickedDate.isSame(dayjs(), 'date')) setSelectedDate(clickedDate);
  }, [clickedDate]);

  return (
    <>
      <DayContainer>
        {MyCalendar.days.map((day, idx) => (
          <DayBox key={day} day={idx}>
            {day}
          </DayBox>
        ))}
      </DayContainer>
      <DateContainer>
        {dates.map((date, idx) => {
          let blockDate = dayjs(new Date(year, month, date));
          if (idx <= calendar.startDay)
            blockDate = dayjs(new Date(year, month - 1, date));
          if (idx > calendar.startDay + calendar.endDate)
            blockDate = dayjs(new Date(year, month + 1, date));
          return (
            <DateBox
              key={`day-${blockDate.year()}-${blockDate.month()}-${blockDate.date()}`}
              date={blockDate}
              isNotCurrMonth={
                idx <= calendar.startDay ||
                idx > calendar.startDay + calendar.endDate
              }
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
            <Todo key={plan.id}>
              {plan.title}
              <Icon
                icon="IconTrash"
                width={15}
                height={15}
                onClick={() => deletePlan(plan.id)}
              />
            </Todo>
          ))}
        </Todos>
      </Container>
      <ModalBottomSheet open={onBottomSheetMenu} setOpen={setOnBottomSheetMenu}>
        <BottomSheetMenu>
          <SheetContainer>
            제목
            <Input type="text" ref={titleInputRef} />
          </SheetContainer>
        </BottomSheetMenu>
        <BottomSheetMenu>
          <SheetContainer>
            시작일
            <Input
              type="date"
              defaultValue={selectedDate.format('YYYY-MM-DD')}
            />
          </SheetContainer>
        </BottomSheetMenu>
        <BottomSheetMenu>
          <SheetContainer>
            종료일
            <Input
              type="date"
              defaultValue={selectedDate.format('YYYY-MM-DD')}
            />
          </SheetContainer>
        </BottomSheetMenu>
        <BottomSheetMenu>
          <SheetContainer>
            하루종일
            <ToggleSwitch
              isTrue={toggleState}
              onClick={() => setToggleState((prev) => !prev)}
            >
              <ToggleBtn isTrue={toggleState} />
            </ToggleSwitch>
          </SheetContainer>
        </BottomSheetMenu>
        <BottomSheetMenu>위치</BottomSheetMenu>
        <BottomSheetMenu>알림설정</BottomSheetMenu>
        <BottomSheetMenu>
          <SheetContainer>
            메모
            <Input type="text" ref={descriptionInputRef} />
          </SheetContainer>
        </BottomSheetMenu>
        <BottomSheetMenu>
          <Button
            onClick={() => {
              // TODO react-hook-form 으로 바꾸고 나머지 기능들 추가

              if (!titleInputRef.current?.value) {
                alert('제목을 입력하세요');
                return;
              }
              addPlan(
                {
                  title: titleInputRef.current?.value,
                  // local time -> zulu time
                  startAt: selectedDate.hour(selectedDate.hour() + 9).format(),
                  endAt: selectedDate.hour(selectedDate.hour() + 9).format(),
                  description: descriptionInputRef.current?.value ?? '',
                  location: null,
                  alarm: 'none',
                },
                {
                  onSuccess: () => {
                    if (!titleInputRef.current || !descriptionInputRef.current)
                      return;
                    titleInputRef.current.value = '';
                    descriptionInputRef.current.value = '';
                    setOnBottomSheetMenu(false);
                  },
                }
              );
            }}
          >
            일정 추가하기
          </Button>
        </BottomSheetMenu>
      </ModalBottomSheet>
    </>
  );
}
export default Calendar;
