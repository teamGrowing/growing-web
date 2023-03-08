import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';

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

const DateBox = styled.div<{
  day: number;
  notCurrMonth?: boolean;
  today?: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 6px 0px;
  gap: 4px;

  height: 80px;
  color: ${({ day, notCurrMonth }) => {
    let color = '#171717';
    if (day === 0 || day === 7) color = '#EA6060';
    if (day === 6) color = '#61B2E4';
    if (notCurrMonth) color += '66';
    return color;
  }};
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
  border-radius: 30px 30px 0px 0px;

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

  /* GRAY/50 */

  background: #fafafa;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 30px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  font-family: 'PretendardLight';
  font-size: 14px;
  line-height: 17px;
`;
type CalendarProps = {
  year: number;
  month: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
};

const week = ['일', '월', '화', '수', '목', '금', '토'];
const todoList = ['2주년', '롯데월드'];

function Calendar({ year, month }: CalendarProps) {
  const start = new Date(year, month, 0);
  const startDate = start.getDate(); // 일
  const startDay = start.getDay(); // 요일

  const end = new Date(year, month + 1, 0);
  const endDate = end.getDate();
  const endDay = end.getDay();

  const dates: number[] = [];
  for (let i = 0; i <= startDay; i += 1) dates.push(startDate - (startDay - i));
  for (let i = 1; i <= endDate; i += 1) dates.push(i);
  for (let i = 0; endDay + i + 1 < 7; i += 1) dates.push(i + 1);

  return (
    <>
      <DayContainer>
        {week.map((day, idx) => (
          <DayBox day={idx}>{day}</DayBox>
        ))}
      </DayContainer>
      <DateContainer>
        {dates.map((date, idx) => (
          <DateBox
            day={idx % 7}
            notCurrMonth={idx <= startDay || idx > startDay + endDate}
          >
            {date}
          </DateBox>
        ))}
      </DateContainer>
      <Container>
        <TodoTitle>
          <div className="text-gradient400">Todo</div>
          <Icon icon="IconPlus" />
        </TodoTitle>
        <Todos className="hidden-scrollbar">
          {todoList.map((todo) => (
            <Todo>{todo}</Todo>
          ))}
        </Todos>
      </Container>
    </>
  );
}
export default Calendar;
