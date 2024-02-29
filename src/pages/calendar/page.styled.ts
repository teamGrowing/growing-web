import { LayoutWithNavbar } from 'components/layout/common';
import dayjs from 'dayjs';
import styled from 'styled-components';

export const PageContainer = styled(LayoutWithNavbar)`
  overflow: scroll;
`;
export const TodayBtn = styled.button`
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

export const CalenderStyleWrapper = styled.div<{ selectedDate?: string }>`
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
  .fc-day-today .fc-daygrid-day-number {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.purple200};
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
