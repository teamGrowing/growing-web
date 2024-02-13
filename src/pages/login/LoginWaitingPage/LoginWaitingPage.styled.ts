import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 160px;

  background-color: ${({ theme }) => theme.color.purple50};

  overflow: hidden;
`;

export const StyledText = styled.p`
  font-size: 19px;
  font-weight: 600;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

export const SharedBtn = styled.button`
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 4px;
  padding: 4px 10px;

  color: ${({ theme }) => theme.color.purple600};
`;

export const StyledImg = styled.img`
  width: 240px;
  margin-left: -10px;
`;
