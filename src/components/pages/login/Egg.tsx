import React from 'react';
import styled from 'styled-components';
import { ImgEgg } from 'assets/image';
import { MENT_LOGIN } from 'constants/ments';
import changeEmojiToSpan from 'util/Text';

const Container = styled.button`
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledEgg = styled.img`
  width: 190px;
  height: 190px;
`;

const ClickText = styled.div`
  color: ${({ theme }) => theme.color.white};
  font-size: 16px;
`;

type EggType = {
  onClick?: () => void;
};

export default function Egg({ onClick }: EggType) {
  return (
    <Container type="submit">
      <StyledEgg src={ImgEgg} alt="egg" />
      {onClick && (
        <ClickText
          className="text-gradient400"
          dangerouslySetInnerHTML={changeEmojiToSpan(MENT_LOGIN.CLICK)}
        />
      )}
    </Container>
  );
}
