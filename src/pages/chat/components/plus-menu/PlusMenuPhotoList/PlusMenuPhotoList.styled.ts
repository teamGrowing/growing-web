import styled, { css } from 'styled-components';

export const ViewAllPhotos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
  justify-items: center;
`;

export const PhotoContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;

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
