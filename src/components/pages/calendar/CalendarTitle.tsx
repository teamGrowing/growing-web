import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';

const Container = styled.div`
  width: 100%;
  padding-top: 39px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Year = styled.div`
  font-family: 'PretendardRegular';
  font-size: 15px;
  line-height: 18px;
`;
const Month = styled.div`
  font-family: 'PretendardMedium';
  font-size: 23px;
  line-height: 27px;
`;

type CalendarTitleProps = {
  year: number;
  month: number;
  onLeftArrowClick: React.MouseEventHandler;
  onRightArrowClick: React.MouseEventHandler;
};

const months = {
  0: 'January',
  1: 'Feburary',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

function CalendarTitle({
  year,
  month,
  onLeftArrowClick,
  onRightArrowClick,
}: CalendarTitleProps) {
  return (
    <Container>
      <Icon icon="IconArrowLeft" onClick={onLeftArrowClick} />
      <Title>
        <Year className="text-gradient400">{year}</Year>
        <Month className="text-gradient400">
          {months[(month % 12).toString() as unknown as keyof typeof months]}
        </Month>
      </Title>
      <Icon icon="IconArrowRight" onClick={onRightArrowClick} />
    </Container>
  );
}

export default CalendarTitle;
