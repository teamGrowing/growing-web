import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: max-content;
  padding: 18px 25px 18px 28px;
  background-color: ${({ theme }) => theme.color.white}a8;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.color.gray200};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const GaugeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const Bar = styled.div`
  position: relative;

  width: 178px;
  height: 6px;
  background-color: ${({ theme }) => theme.color.gray200};
  border-radius: 20px;
`;

export const ActiveBar = styled.div<{ level: number }>`
  position: absolute;

  width: ${(props) => props.level}%;
  height: 6px;
  background: linear-gradient(130.11deg, #f0b5ef 7.3%, #bad8f9 100%);
  border-radius: ${(props) => (props.level === 100 ? '20px' : '20px 0 0 20px')};
`;
