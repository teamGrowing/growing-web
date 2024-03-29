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

export const fadeInOut = keyframes`
  0% {
    opacity: 0;
    visibility:hidden;
  }
  50% {
    opacity: 1;
    visibility:visible;
  }
  100%{
    opacity:0;
    visibility:hidden;
  }
`;

export const pulse = keyframes`
  from {
    transform: scale3d(0.8, 0.8, 0.8);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

export const clickPulse = keyframes`
  from {
    transform: scale3d(1.05, 1.05, 1.05);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
`;
