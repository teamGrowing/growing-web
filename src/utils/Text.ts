import { EMOJI_REGEX } from 'constants/regexs';

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

export const chooseConjunction = (word: string) => {
  const lastChar = word[word.length - 1];
  const lastCharCode = lastChar.charCodeAt(0);

  if (lastCharCode >= 0xac00 && lastCharCode <= 0xd7a3) {
    const jongseongIndex = (lastCharCode - 0xac00) % 28;
    if (jongseongIndex > 0) {
      return '과';
    }
    return '와';
  }
  return '와';
};

export const chooseSubjectMarker = (word: string) => {
  const lastChar = word[word.length - 1];
  const lastCharCode = lastChar.charCodeAt(0);

  if (lastCharCode >= 0xac00 && lastCharCode <= 0xd7a3) {
    const jongseongIndex = (lastCharCode - 0xac00) % 28;
    return jongseongIndex > 0 ? '이가' : '가';
  }
  return '가';
};

export default changeEmojiToSpan;
