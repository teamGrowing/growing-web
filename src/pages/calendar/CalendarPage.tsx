import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import interaction from '@fullcalendar/interaction';
import { EventDropArg } from '@fullcalendar/core';
import CalendarTitle from '../../components/pages/calendar/CalendarTitle';
import {
  useCalendarMonthlyPlans,
  useModifyPlanMutation,
} from '../../hooks/queries/calendar.queries';
import userStore from '../../stores/UserStore';
import TodoArea from '../../components/pages/calendar/TodoArea';
import useToast from '../../hooks/common/useToast';
import { MENT_CALENDAR } from '../../constants/ments';

const PageContainer = styled.div`
  overflow: scroll;
`;
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
  top: 28px;

  background: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.4) 7.3%,
    rgba(243, 129, 129, 0.4) 100%
  );
  border-radius: 20px;
`;

const CalenderStyleWrapper = styled.div<{ selectedDate?: string }>`
  --fc-border-color: none;
  --fc-event-bg-color: none;
  --fc-event-border-color: none;
  --fc-today-bg-color: ${({ theme, selectedDate }) => {
    return dayjs().isSame(selectedDate, 'D') ? theme.color.purple50 : 'none';
  }};
  --fc-highlight-color: ${({ theme }) => theme.color.gray100};

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
  .fc-day-today {
    a {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.color.purple200};
    }
  }
  .fc-daygrid-day-top {
    font-size: 12px;
    justify-content: center;
  }

  .fc-daygrid-day-events {
    height: 60px;
  }

  .fc-event-title {
    width: 100%;
    padding: 2px 5px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: black;
    font-size: 12px;
    font-weight: 500;
    border-radius: 10px;
    background: linear-gradient(
      130.11deg,
      rgba(252, 227, 138, 0.4) 7.3%,
      rgba(243, 129, 129, 0.4) 100%
    );
  }
  .fc-daygrid-event-dot {
    display: none;
  }

  .fc-event-time {
    display: none;
  }

  td[data-date='${(props) => props.selectedDate}'] {
    background-color: ${({ theme }) => theme.color.purple50};
  }
`;

function CalendarPage() {
  const calenderRef = useRef<FullCalendar | null>(null);
  const [calInfo, setCalInfo] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { addToast } = useToast();

  const { mutate: modifyPlanMutate } = useModifyPlanMutation({
    coupleId: userStore.user?.coupleId!,
  });

  const { data: monthlyPlans } = useCalendarMonthlyPlans({
    coupleId: userStore.user?.coupleId!,
    year: calInfo.format('YYYY'),
    month: calInfo.format('MM'),
    options: { suspense: false },
  });

  const modifyPlan = (info: EventDropArg) => {
    modifyPlanMutate(
      {
        // eslint-disable-next-line no-underscore-dangle
        id: info.event._def.publicId,
        info: {
          startAt: info.event.start?.toISOString(),
          endAt: info.event.end?.toISOString(),
        },
      },
      {
        onSuccess: () => addToast(MENT_CALENDAR.PLAN_MODIFY_SUCCESS),
      }
    );
  };

  return (
    <PageContainer className="page-container with-navbar hidden-scrollbar">
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
      <CalenderStyleWrapper selectedDate={selectedDate.format('YYYY-MM-DD')}>
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
              start: p.startAt,
              end: p.endAt,
            };
          })}
          dateClick={(arg) => setSelectedDate(dayjs(arg.date))}
          editable
          eventDrop={(info) => modifyPlan(info)}
          contentHeight="auto"
        />
      </CalenderStyleWrapper>
      <TodoArea date={selectedDate} />
    </PageContainer>
  );
}
export default CalendarPage;
