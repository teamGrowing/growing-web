/* eslint-disable no-param-reassign */
import { useState } from 'react';

export default function useVideo({
  videoEl,
  time,
}: {
  videoEl: HTMLVideoElement | null;
  time: number;
}) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [isMute, setIsMute] = useState<boolean>(false);

  const onPlay = () => {
    if (!videoEl) return;

    if (playing) {
      setPlaying(false);
      videoEl.pause();
    } else {
      setPlaying(true);
      videoEl.play();
    }
  };

  const onSink = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setCurrentTime(e.currentTarget.currentTime);

    if (e.currentTarget.currentTime >= time) {
      setPlaying(false);
    }
  };

  const onSeek = (e: React.MouseEvent<HTMLProgressElement, MouseEvent>) => {
    if (!videoEl) return;

    let num = e.pageX - e.currentTarget.offsetLeft;
    if (window.innerWidth > 780) {
      num -= (window.innerWidth - 780) / 2;
    }
    const x = num / e.currentTarget.offsetWidth;
    videoEl.currentTime = x * time;
    setCurrentTime(x * time);

    if (playing) {
      videoEl.play();
    } else {
      videoEl.pause();
    }
  };

  const onMute = () => {
    if (!videoEl) return;

    if (isMute) {
      videoEl.muted = false;
      setIsMute(false);
    } else {
      videoEl.muted = true;
      setIsMute(true);
    }
  };

  return {
    playing,
    currentTime,
    isMute,
    onPlay,
    onSink,
    onSeek,
    onMute,
  };
}
