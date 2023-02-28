import React from 'react';
import styled from 'styled-components';
import PET_GAUGE_MAX from '../../../constants/constants';
import { PetDto } from '../../../types/pet/Pet.dto';
import { ReactComponent as IconBowl } from '../../../assets/icons/home/IconBowl.svg';
import { ReactComponent as IconSmile } from '../../../assets/icons/home/IconSmile.svg';
import { ReactComponent as IconLetter } from '../../../assets/icons/home/IconLetter.svg';

const Wrapper = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: max-content;
  padding: 18px 25px 18px 28px;
  background-color: ${({ theme }) => theme.color.white}a8;
  box-shadow: 4px 4px 14px #0000003f;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
const GaugeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const Bar = styled.div`
  position: relative;

  width: 178px;
  height: 6px;
  background-color: ${({ theme }) => theme.color.gray200};
  border-radius: 20px;
`;
const ActiveBar = styled.div<{ level: number }>`
  position: absolute;

  width: ${(props) => props.level}%;
  height: 6px;
  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.7) 7.3%,
    rgba(234, 96, 96, 0.7) 100%
  );
  border-radius: ${(props) => (props.level === 100 ? '20px' : '20px 0 0 20px')};
`;

type PetGaugeProps = Pick<
  PetDto,
  'hungryGauge' | 'attentionGauge' | 'loveGauge'
>;

function PetGauge({ hungryGauge, attentionGauge, loveGauge }: PetGaugeProps) {
  function getGaugeToPercent(n: number | undefined) {
    if (!n) {
      return 0;
    }
    return (n / PET_GAUGE_MAX) * 100;
  }

  return (
    <Wrapper>
      <Container>
        <GaugeRow>
          <IconBowl />
          <Bar>
            <ActiveBar level={getGaugeToPercent(hungryGauge)} />
          </Bar>
        </GaugeRow>

        <GaugeRow>
          <IconSmile />
          <Bar>
            <ActiveBar level={getGaugeToPercent(attentionGauge)} />
          </Bar>
        </GaugeRow>

        <GaugeRow>
          <IconLetter />
          <Bar>
            <ActiveBar level={getGaugeToPercent(loveGauge)} />
          </Bar>
        </GaugeRow>
      </Container>
    </Wrapper>
  );
}

export default PetGauge;
