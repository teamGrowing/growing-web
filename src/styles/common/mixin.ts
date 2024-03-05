import { css } from 'styled-components';

export const hoverShrinkEffect = css`
  transition: transform 0.3s ease;
  :hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`;

export const hiddenScrollbar = css`
  -ms-overflow-style: none; /* Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    /*Chrome */
    display: none;
  }
`;
