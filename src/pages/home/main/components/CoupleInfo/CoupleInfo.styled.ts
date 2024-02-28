import styled from 'styled-components';

export const CoupleInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Dday = styled.div`
  padding: 10px 20px;

  background: linear-gradient(130.11deg, #f094ee40 7.3%, #e5696970 100%);
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.color.gray200};

  font-size: 23px;
`;

export const RefreshButton = styled.button`
  display: flex;
  padding: 1px 20px;
`;

export const NameWrapper = styled.div`
  padding: 12px 0;
`;

export const StyledName = styled.p`
  font-size: 16px;
  line-height: 19px;
`;
