import { EMOJI_REGEX } from '../constants/regexs';

function changeEmojiToSpan(str: string) {
  return {
    __html: str.replace(EMOJI_REGEX, `<span>$&</span>`),
  };
}

export const secondsToText = (second: number) => {
  const hours = Math.floor(second / 360);
  const minutes = String(Math.floor((second % 360) / 60)).padStart(2, '0');
  const seconds = String(Math.floor(second % 60)).padStart(2, '0');

  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

export default changeEmojiToSpan;
