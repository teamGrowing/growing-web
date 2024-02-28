import styled from 'styled-components';
import { float } from 'styles/common/animation';
import { hoverShrinkEffect } from 'styles/common/mixin';

export const Container = styled.div`
  position: relative;

  width: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeartButton = styled.img`
  animation: ${float} 2s ease-in-out infinite;
`;

export const PetOptions = styled.ul`
  position: absolute;
  top: 70px;

  padding: 0 5px;

  width: 100%;
  background-color: #ffffff70;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 14px;
`;

export const PetItem = styled.li`
  height: 62px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;

  font-size: 12px;
  color: ${({ theme }) => theme.color.gray900};
  text-align: center;

  ${hoverShrinkEffect}
`;

export const Border = styled.div`
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.gray400};
`;
