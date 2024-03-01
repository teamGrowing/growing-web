import styled, { css } from 'styled-components';

export const Photos = styled.div`
  flex: 1;

  display: flex;
  gap: 2px;

  width: max-content;
`;

export const Photo = styled.div<{ url: string; isSelected: boolean }>`
  position: relative;

  width: 140px;
  height: 212px;

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

export const ErrorContainer = styled.div`
  width: 100%;
  height: 212px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
