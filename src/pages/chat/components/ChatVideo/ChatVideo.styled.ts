import Icon from 'components/common/Icon/Icon';
import styled from 'styled-components';

export const Container = styled.div<{ height?: string }>`
  position: relative;
  width: 100%;
  ${({ height }) => {
    return { height: height || '100%' };
  }}
  flex: 1;

  display: flex;

  padding-top: 56.25%;
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const VideoController = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  padding: 10px 0;

  background-color: ${({ theme }) => theme.color.gray900}80;
`;

export const StyledTime = styled.p`
  color: ${({ theme }) => theme.color.gray50};
`;

export const PlayBtn = styled(Icon)`
  width: 100%;
`;

export const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  padding: 4px 16px;
`;

export const Progress = styled.progress`
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
