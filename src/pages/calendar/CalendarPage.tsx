/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import interaction from '@fullcalendar/interaction';
import CalendarTitle from '../../components/pages/calendar/CalendarTitle';
import { useCalendarMonthlyPlans } from '../../hooks/queries/calendar.queries';
import userStore from '../../stores/UserStore';
import TodoArea from '../../components/pages/calendar/TodoArea';
import CalendarBottomSheet from '../../components/pages/calendar/CalendarBottomSheet';

const TodayBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2px 0px;
  gap: 10px;

  position: absolute;
  width: 55.71px;
  height: 18px;
  right: 13.29px;
  top: 12px;

  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.4) 7.3%,
    rgba(243, 129, 129, 0.4) 100%
  );
  border-radius: 20px;
`;

const CalenderStyleWrapper = styled.div`
  --fc-border-color: none;
  --fc-event-bg-color: none;
  --fc-event-border-color: none;
  --fc-today-bg-color: ${({ theme }) => theme.color.purple50};

  .fc-media-screen {
    height: 480px;
  }
  .fc-col-header-cell-cushion {
    font-size: 12px;
    font-weight: 200;
  }

  .fc-day {
    border-radius: 10px;
  }
  .fc-day-sat {
    color: #61b2e4;
  }
  .fc-day-sun {
    color: #ea6060;
  }
  .fc-daygrid-day-top {
    font-size: 12px;
    justify-content: center;
  }

  .fc-daygrid-day-events {
    height: 60px;
  }

  .fc-event-title-container {
    border-radius: 10px;
    background: linear-gradient(
      130.11deg,
      rgba(252, 227, 138, 0.4) 7.3%,
      rgba(243, 129, 129, 0.4) 100%
    );
  }
  .fc-event-title {
    width: 100%;
    padding: 2px 5px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: black;
    font-size: 12px;
  }
`;

function CalendarPage() {
  const calenderRef = useRef<FullCalendar | null>(null);
  const [calInfo, setCalInfo] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const { data: monthlyPlans } = useCalendarMonthlyPlans({
    coupleId: userStore.user?.coupleId!,
    year: calInfo.format('YYYY'),
    month: calInfo.format('MM'),
  });

  return (
    <div className="page-container with-navbar">
      <TodayBtn
        onClick={() => {
          setSelectedDate(dayjs());
          setCalInfo(dayjs());
          calenderRef.current?.getApi().today();
        }}
      >
        Today
      </TodayBtn>
      <CalendarTitle
        year={calInfo.year()}
        month={calInfo.month()}
        onLeftArrowClick={() => {
          setCalInfo((prev) => calInfo.set('month', prev.month() - 1));
          calenderRef.current?.getApi().prev();
        }}
        onRightArrowClick={() => {
          setCalInfo((prev) => calInfo.set('month', prev.month() + 1));
          calenderRef.current?.getApi().next();
        }}
      />
      <CalenderStyleWrapper>
        <FullCalendar
          ref={calenderRef}
          plugins={[daygrid, timegrid, interaction]}
          initialView="dayGridMonth"
          headerToolbar={false}
          initialDate={calInfo.format('YYYY-MM-DD')}
          fixedWeekCount={false}
          events={monthlyPlans?.map((p) => {
            return {
              id: p.id,
              title: p.title,
              start: dayjs(new Date(p.startAt)).format('YYYY-MM-DD'),
              end: dayjs(new Date(p.endAt)).format('YYYY-MM-DD'),
            };
          })}
          dateClick={(arg) => setSelectedDate(dayjs(arg.date))}
        />
      </CalenderStyleWrapper>
      <TodoArea date={selectedDate} />
    </div>
  );
}
export default CalendarPage;
