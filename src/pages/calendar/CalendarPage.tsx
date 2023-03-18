import dayjs from 'dayjs';
import { useState } from 'react';
import CalendarTitle from '../../components/pages/calendar/CalendarTitle';
import Calendar from '../../components/pages/calendar/Calendar';

function CalendarPage() {
  const [calInfo, setCalInfo] = useState(dayjs());

  return (
    <>
      <CalendarTitle
        year={calInfo.year()}
        month={calInfo.month()}
        onLeftArrowClick={() =>
          setCalInfo((prev) => calInfo.set('month', prev.month() - 1))
        }
        onRightArrowClick={() =>
          setCalInfo((prev) => calInfo.set('month', prev.month() + 1))
        }
      />
      <Calendar year={calInfo.year()} month={calInfo.month()} />
    </>
  );
}
export default CalendarPage;
