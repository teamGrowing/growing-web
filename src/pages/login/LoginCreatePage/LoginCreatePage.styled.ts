import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;

  padding-left: 40px;
  padding-right: 40px;

  background-color: ${({ theme }) => theme.color.purple50};

  overflow: hidden;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const StyledInput = styled.input`
  margin-top: 20px;
  padding-bottom: 12px;

  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.color.purple600};

  font-size: 19px;
  text-align: center;
`;
