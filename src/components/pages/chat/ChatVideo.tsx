/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Icon from '../../common/Icon/Icon';
import { VideoDto } from '../../../types/chat/ChatPhoto.dto';
import { secondsToText } from '../../../util/Text';
import useVideo from '../../../hooks/common/useVideo';

const Container = styled.div<{ height: string }>`
  position: relative;
  width: 100%;
  height: ${(props) => props.height};
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const VideoController = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 10px 0;

  background-color: ${({ theme }) => theme.color.gray900}80;
`;

const StyledTime = styled.p`
  color: ${({ theme }) => theme.color.gray50};
`;

const PlayBtn = styled(Icon)`
  width: 100%;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  padding: 4px 16px;
`;

const Progress = styled.progress`
  flex: 1;
  height: 6px;
  appearance: none;

  ::-webkit-progress-bar {
    background: ${({ theme }) => theme.color.gray50};
    border-radius: 10px;
  }
  ::-webkit-progress-value {
    border-radius: 10px;
    background: ${({ theme }) => theme.color.gradient400};
  }
`;

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
    <Container
      onClick={() => {
        setShowController(!showController);
      }}
      height={height}
    >
      <StyledVideo
        id="video"
        ref={ref}
        playsInline
        poster={thumbnailUrl}
        onTimeUpdate={onSink}
      >
        <source src={videoUrl} />
        <track kind="captions" />
      </StyledVideo>
      {showController && (
        <VideoController onClick={(e) => e.stopPropagation()}>
          <ControlBar>
            <StyledTime>{secondsToText(currentTime)}</StyledTime>
            <Progress max={time} value={currentTime} onClick={onSeek} />
            <StyledTime>{secondsToText(time)}</StyledTime>
            <Icon
              icon={isMute ? 'IconMute' : 'IconUnmute'}
              themeColor="gray50"
              onClick={onMute}
            />
          </ControlBar>
          <PlayBtn
            icon={playing ? 'IconPause' : 'IconPlay'}
            size={40}
            themeColor="gray50"
            onClick={onPlay}
          />
        </VideoController>
      )}
    </Container>
  );
}
