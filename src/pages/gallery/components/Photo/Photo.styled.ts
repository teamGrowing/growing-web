import styled, { css } from 'styled-components';
import Icon from 'components/common/Icon/Icon';

export const PhotoBox = styled.div<{ isSelected: boolean; imgUrl: string }>`
  position: relative;

  background: ${({ isSelected, imgUrl }) =>
    isSelected
      ? css`linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imgUrl})`
      : css`url(${imgUrl})`};
  background-size: cover;

  filter: drop-shadow(0px 0px 4px rgba(151, 71, 255, 0.2));
  border-radius: 6px;

  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const CheckIcon = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;

  flex-grow: 0;
  z-index: 4;
`;
