import dayjs from 'dayjs';
import * as S from './Today.styled';

const Today = () => {
  return (
    <S.Container>
      <S.Day>{dayjs().format('DD')}</S.Day>
      <S.YearMonth>
        <S.Year>{dayjs().format('YYYY')}</S.Year>
        <S.Month>{dayjs().locale('en').format('MMMM')}</S.Month>
      </S.YearMonth>
    </S.Container>
  );
};

export default Today;
