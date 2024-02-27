import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import daygrid from '@fullcalendar/daygrid';
import timegrid from '@fullcalendar/timegrid';
import interaction from '@fullcalendar/interaction';
import { EventDropArg } from '@fullcalendar/core';
import CalendarTitle from 'pages/calendar/components/CalendarTitle/CalendarTitle';
import { useCalendarMonthlyPlans, useModifyPlanMutation } from 'hooks/queries';
import userStore from 'stores/UserStore';
import TodoArea from 'pages/calendar/components/TodoArea/TodoArea';
import useToast from 'hooks/common/useToast';
import { MENT_CALENDAR } from 'constants/ments';
import * as S from './CalendarPage.styled';

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
    <S.PageContainer className="hidden-scrollbar">
      <S.TodayBtn
        onClick={() => {
          setSelectedDate(dayjs());
          setCalInfo(dayjs());
          calenderRef.current?.getApi().today();
        }}
      >
        Today
      </S.TodayBtn>
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
      <S.CalenderStyleWrapper selectedDate={selectedDate.format('YYYY-MM-DD')}>
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
      </S.CalenderStyleWrapper>
      <TodoArea date={selectedDate} />
    </S.PageContainer>
  );
}
export default CalendarPage;
