import { ImgEgg } from 'assets/image';
import { MENT_LOGIN } from 'constants/ments';
import changeEmojiToSpan from 'utils/Text';
import * as S from './Egg.styled';

type EggType = {
  onClick?: () => void;
};

export default function Egg({ onClick }: EggType) {
  return (
    <S.Container type="submit">
      <S.StyledEgg src={ImgEgg} alt="egg" />
      {onClick && (
        <S.ClickText
          className="text-gradient400"
          dangerouslySetInnerHTML={changeEmojiToSpan(MENT_LOGIN.CLICK)}
        />
      )}
    </S.Container>
  );
}
