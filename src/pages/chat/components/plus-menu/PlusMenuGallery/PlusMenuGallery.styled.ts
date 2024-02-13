import styled, { css } from 'styled-components';
import { NAVBAR_HEIGHT } from 'constants/constants';

// 전체보기
export const ViewAllContainer = styled.div`
  z-index: 11;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: ${({ theme }) => theme.color.gray50};
`;

export const ScrollView = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const ViewAllPhotos = styled.div`
  padding: ${NAVBAR_HEIGHT}px 0;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2px;
  justify-items: center;

  height: 100%;
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
`;

// 하단 메뉴
export const PlusMenuGalleryContainer = styled.div`
  z-index: 2;

  position: sticky;
  bottom: 0;

  display: flex;
  flex-direction: column;

  margin-left: -16px;

  width: calc(100% + 32px);
  max-width: 780px;

  background-color: ${({ theme }) => theme.color.white};
`;

export const SendSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

export const PhotoSection = styled.section`
  flex: 1;

  display: flex;

  width: 100%;
  overflow-x: scroll;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );
`;

export const Photos = styled.div`
  flex: 1;

  display: flex;
  padding-left: 2px;
  gap: 2px;

  width: max-content;
`;

export const Photo = styled.div<{ url: string; isSelected: boolean }>`
  position: relative;

  width: 140px;
  height: 252px;

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

export const FooterSection = styled.section`
  display: flex;
  align-items: center;
  gap: 4px;

  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  height: 52px;

  padding: 12px 16px 20px;

  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.1) 7.3%,
    rgba(234, 96, 96, 0.1) 100%
  );

  > p {
    font-size: 14px;
  }
`;
