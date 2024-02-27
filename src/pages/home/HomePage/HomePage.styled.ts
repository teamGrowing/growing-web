import { LayoutWithNavbar } from 'components/layout/common';
import styled from 'styled-components';

export const HomeContainer = styled(LayoutWithNavbar)`
  padding-top: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${({ theme }) => theme.color.background};

  position: relative;
`;

export const Dates = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 8px 20px 8px 36px;

  color: ${({ theme }) => theme.color.gray700};
`;

export const Today = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Day = styled.div`
  font-family: 'PretendardMedium';
  font-size: 40px;
`;

export const YearMonth = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Year = styled.div`
  font-family: 'PretendardMedium';
  font-size: 23px;
`;

export const Month = styled.div`
  font-family: 'PretendardMedium';
  font-size: 14px;
`;

export const Dday = styled.div`
  width: max-content;
  padding: 10px 20px;
  background-image: linear-gradient(130.11deg, #f094ee40 7.3%, #e5696970 100%);
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.color.gray200};

  font-family: 'PretendardMedium';
  font-size: 23px;
`;

export const StyledName = styled.div`
  padding: 12px 26px;
  border-radius: 14px;

  font-family: 'PretendardMedium';
  color: ${({ theme }) => theme.color.gray700};
  font-size: 16px;
  line-height: 19px;
  text-align: end;
`;

export const Shop = styled.div`
  width: 36px;
  height: 20px;
  margin: 2px 0 8px 31px;
  padding: 6px;
  /* box-shadow: 3px 3px 10px #00000033; */
  border-radius: 50%;
  /* background-color: ${({ theme }) => theme.color.white}; */
`;
