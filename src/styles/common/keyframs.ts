import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeInDown = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const fadeOutUp = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-100%);
    }
`;
