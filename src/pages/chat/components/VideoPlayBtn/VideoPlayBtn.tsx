import { SVGAttributes } from 'react';
import * as S from './VideoPlayBtn.styled';

export default function VideoPlayBtn({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <S.VideoButton
      {...props}
      icon="IconPlay"
      size={30}
      themeColor="purple100"
    />
  );
}
