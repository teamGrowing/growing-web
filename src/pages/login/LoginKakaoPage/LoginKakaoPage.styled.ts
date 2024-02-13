import styled from 'styled-components';

export const PageContainer = styled.div`
  padding-left: 40px;
  padding-right: 40px;

  background-color: ${({ theme }) => theme.color.white};

  overflow-y: hidden;
`;

export const StyledLogo = styled.img`
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate3d(-50%, -40%, 0);

  width: 220px;
  height: 220px;
  border-radius: 50%;
`;

export const StyledButton = styled.button`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 32px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  padding: 16px 0;

  width: calc(100% - 32px);
  background: #fee500;
  border-radius: 10px;

  font-family: 'PretendardMedium';
  font-size: 16px;
`;
