import Waves from 'assets/image/FeedWaves.png';
import MENT_HOME from 'constants/ments';
import changeEmojiToSpan from 'utils/Text';
import * as S from './HelpText.styled';
import { PetOption } from '../../types/PetOption';

interface Props {
  reactionType: PetOption;
}

const HelpText = ({ reactionType }: Props) => {
  const ment =
    reactionType === 'feed' ? MENT_HOME.PET_FEED_TIP : MENT_HOME.PET_PLAY_TIP;

  return (
    <S.Info>
      <S.Outer>
        <S.Inner>
          <S.Letter>
            <p className="text-gradient400">
              잠깐만요 !! <span>🚨</span>
            </p>
            <br />
            <div
              className="text-gradient400"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={changeEmojiToSpan(ment)}
            />
          </S.Letter>
        </S.Inner>
      </S.Outer>

      <S.Wave src={Waves} />
    </S.Info>
  );
};

export default HelpText;
