import styled from 'styled-components';

export const Container = styled.div`
  width: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PetOptions = styled.div`
  padding: 0 5px;

  width: 100%;
  background-color: #ffffff70;
  box-shadow: 0px 4px 4px #0000003f;
  border-radius: 14px;
`;

export const Border = styled.div`
  height: 0.5px;
  background-color: ${({ theme }) => theme.color.gray400};
`;

export const PetItem = styled.div`
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
`;
