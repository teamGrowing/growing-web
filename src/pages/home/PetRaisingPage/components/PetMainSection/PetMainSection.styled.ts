import styled from 'styled-components';

export const Main = styled.section`
  width: 100%;
`;

export const Title = styled.div`
  margin-top: 34px;
  padding: 20px 0;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;
  text-align: center;

  > span {
    -webkit-text-fill-color: initial;
  }
`;

export const SubTitle = styled.p`
  padding: 10px 0;

  font-family: 'PretendardMedium';
  color: ${({ theme }) => theme.color.gray500};
  font-size: 14px;
  line-height: 17px;
  text-align: center;
`;

export const Bar = styled.div`
  position: relative;

  margin: 16px 60px 10px 60px;
  height: 23px;

  background-color: ${({ theme }) => theme.color.white}a8;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 20px;
`;

export const ActiveBar = styled.div<{ level: number }>`
  position: absolute;

  width: ${(props) => props.level}%;
  height: 23px;
  background: ${({ theme }) => theme.color.gradient300};
  border-radius: ${(props) => (props.level === 100 ? '20px' : '20px 0 0 20px')};
`;
