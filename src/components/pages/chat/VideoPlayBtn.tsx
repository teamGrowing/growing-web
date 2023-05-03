import React, { SVGAttributes } from 'react';
import styled from 'styled-components';
import Icon from 'components/common/Icon/Icon';

const VideoButton = styled(Icon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3D(-50%, -50%, 0);
`;

export default function VideoPlayBtn({ ...props }: SVGAttributes<SVGElement>) {
  return (
    <VideoButton {...props} icon="IconPlay" size={30} themeColor="purple100" />
  );
}
