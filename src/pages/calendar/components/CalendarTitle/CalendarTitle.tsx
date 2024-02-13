import Icon from 'components/common/Icon/Icon';
import * as S from './CalendarTitle.styled';

type CalendarTitleProps = {
  year: number;
  month: number;
  onLeftArrowClick: React.MouseEventHandler;
  onRightArrowClick: React.MouseEventHandler;
};

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function CalendarTitle({
  year,
  month,
  onLeftArrowClick,
  onRightArrowClick,
}: CalendarTitleProps) {
  return (
    <S.Container>
      <Icon icon="IconArrowLeft" onClick={onLeftArrowClick} />
      <S.Title>
        <S.Year className="text-gradient400">{year}</S.Year>
        <S.Month className="text-gradient400">{months[month % 12]}</S.Month>
      </S.Title>
      <Icon icon="IconArrowRight" onClick={onRightArrowClick} />
    </S.Container>
  );
}

export default CalendarTitle;
