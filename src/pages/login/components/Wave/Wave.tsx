import Waves from 'assets/image/HomeWaves.png';
import * as S from './Wave.styled';

export default function Wave() {
  return (
    <S.WaveWrapper>
      <S.StyledImg src={Waves} alt="wave" />
    </S.WaveWrapper>
  );
}
