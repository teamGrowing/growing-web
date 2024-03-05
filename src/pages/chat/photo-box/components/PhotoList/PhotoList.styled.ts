import styled, { css } from 'styled-components';
import { clickPulse } from 'styles/common/animation';

export const ViewAllPhotos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
  justify-items: center;

  width: 100%;
`;

export const EmptyCase = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;

  font-family: 'PretendardMedium';
  font-size: 19px;
`;

export const PhotoContainer = styled.div`
  width: 100%;
  position: relative;

  ::after {
    display: block;
    content: '';
    padding-bottom: 100%;
  }
`;

export const GridPhoto = styled.div<{ url: string; isSelected: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;

  background-image: ${(props) => `url(${props.url})`};
  background-size: cover;
  background-position: center;
  opacity: ${(props) => props.isSelected && '0.5'};

  ${(props) =>
    props.isSelected &&
    css`
      border: 2px solid ${({ theme }) => theme.color.purple600};
    `};

  :active {
    animation: ${clickPulse} 0.3s ease-in-out;
    border: 2px solid ${({ theme }) => theme.color.purple600};
  }
`;

export const PhotoSelect = styled.div<{ isSelected: boolean }>`
  position: absolute;
  top: 6px;
  right: 6px;

  width: 20px;
  height: 20px;

  background: ${(props) =>
    props.isSelected
      ? props.theme.color.gradient400
      : props.theme.color.gray50};

  border: 1px solid ${({ theme }) => theme.color.gray500};
  border-radius: 50%;

  font-size: 12px;
  color: ${({ theme }) => theme.color.white};
  text-align: center;
`;

export const PhotoLengthLabel = styled.div`
  position: absolute;
  bottom: 6px;
  left: 6px;

  display: flex;
  align-items: center;
  gap: 2px;

  font-size: 12px;
`;

export const SkeletonWrapper = styled.div`
  position: relative;
  width: 100%;

  ::after {
    display: block;
    content: '';
    padding-bottom: 100%; // 1:1 비율 유지
  }
`;

export const SkeletonInnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  * {
    display: block;
    height: 100%;
  }
`;
