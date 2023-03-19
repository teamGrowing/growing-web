import dayjs from 'dayjs';
import { useState } from 'react';
import styled from 'styled-components';
import CalendarTitle from '../../components/pages/calendar/CalendarTitle';
import Calendar from '../../components/pages/calendar/Calendar';

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

function CalendarPage() {
  const [calInfo, setCalInfo] = useState(dayjs());

  return (
    <div className="page-container">
      <TodayBtn onClick={() => setCalInfo(dayjs())}>Today</TodayBtn>
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
      <Calendar
        year={calInfo.year()}
        month={calInfo.month()}
        clickedDate={calInfo}
      />
    </div>
  );
}
export default CalendarPage;
