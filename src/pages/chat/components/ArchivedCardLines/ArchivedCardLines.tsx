/* eslint-disable react/no-array-index-key */
import * as S from './ArchivedCardLines.styled';

export default function ArchivedCardLines({ n }: { n: number }) {
  return (
    <S.Lines>
      {Array.from({ length: n < 21 ? 21 : n }, () => 0).map((v, i) => (
        <S.Line key={i} />
      ))}
    </S.Lines>
  );
}
