/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import Icon from 'components/common/Icon/Icon';
import { VideoDto } from 'models/chat';
import { secondsToText } from 'utils/Text';
import useVideo from 'hooks/common/useVideo';
import * as S from './ChatVideo.styled';

interface VideoProps extends VideoDto {
  height: string;
}

export default function ChatVideo({
  id,
  thumbnailUrl,
  time,
  videoUrl,
  height,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const videoEl = ref && ref.current;

  const [showController, setShowController] = useState<boolean>(true);

  const { playing, currentTime, isMute, onPlay, onSink, onSeek, onMute } =
    useVideo({ videoEl, time });

  return (
    <S.Container
      onClick={() => {
        setShowController(!showController);
      }}
      height={height}
    >
      <S.StyledVideo
        id="video"
        ref={ref}
        playsInline
        poster={thumbnailUrl}
        onTimeUpdate={onSink}
      >
        <source src={videoUrl} />
        <track kind="captions" />
      </S.StyledVideo>
      {showController && (
        <S.VideoController onClick={(e) => e.stopPropagation()}>
          <S.ControlBar>
            <S.StyledTime>{secondsToText(currentTime)}</S.StyledTime>
            <S.Progress max={time} value={currentTime} onClick={onSeek} />
            <S.StyledTime>{secondsToText(time)}</S.StyledTime>
            <Icon
              icon={isMute ? 'IconMute' : 'IconUnmute'}
              themeColor="gray50"
              onClick={onMute}
            />
          </S.ControlBar>
          <S.PlayBtn
            icon={playing ? 'IconPause' : 'IconPlay'}
            size={40}
            themeColor="gray50"
            onClick={onPlay}
          />
        </S.VideoController>
      )}
    </S.Container>
  );
}
