import EMOJI_REGEX from '../constants/regex';

function changeEmojiToSpan(str: string) {
  return {
    __html: str.replace(EMOJI_REGEX, `<span>$&</span>`),
  };
}

export default changeEmojiToSpan;
