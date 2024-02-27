import { css } from 'styled-components';

export const hoverShrinkEffect = css`
  transition: transform 0.3s ease;
  :hover {
    transform: scale(0.95);
    cursor: pointer;
  }
`;
