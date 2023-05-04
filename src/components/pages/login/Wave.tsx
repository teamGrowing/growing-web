import React from 'react';
import styled from 'styled-components';
import Waves from 'assets/image/HomeWaves.png';

const WaveWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: flex-end;
  width: 100%;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 224px;
`;

export default function Wave() {
  return (
    <WaveWrapper>
      <StyledImg src={Waves} alt="wave" />
    </WaveWrapper>
  );
}
