import styled from 'styled-components';
import { hoverShrinkEffect } from 'styles/common/mixin';

export const Box = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;

  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.color.white}aa;
  border-radius: 10px;

  ${hoverShrinkEffect}
`;

export const Title = styled.div`
  font-family: 'PretendardMedium';

  font-size: 16px;
  line-height: 23px;
  color: ${({ theme }) => theme.color.gray700};
`;

export const Date = styled.div`
  font-family: 'PretendardMedium';
  font-size: 13px;
  color: ${({ theme }) => theme.color.gray400};

  padding-left: 2px;
`;

export const LoadingContainer = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
