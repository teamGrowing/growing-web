import styled from 'styled-components';

export const Info = styled.section`
  position: relative;
  margin-bottom: calc(constant(safe-area-inset-bottom) * -1);
  margin-bottom: calc(env(safe-area-inset-bottom) * -1);

  width: 100%;
`;

export const Outer = styled.div`
  background: ${({ theme }) => theme.color.gradient300};
  opacity: 0.9;

  border-radius: 20px 20px 0 0;
  border-top: 15px solid whilte;
  border-left: 15px solid whilte;
`;

export const Inner = styled.div`
  z-index: 2;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 20px 20px 0 0;
  padding: 28px 15px 0 15px;
  margin-left: 10px;
`;

export const Letter = styled.div`
  position: relative;

  width: 100%;
  height: 100%;
  padding: 18px 10px 55px 10px;
  border-radius: 30px 30px 0 0;
  background-image: linear-gradient(
    130.11deg,
    rgba(252, 227, 138, 0.2) 7.3%,
    rgba(243, 129, 129, 0.2) 100%
  );

  * {
    font-family: 'PretendardMedium';
    color: ${({ theme }) => theme.color.gray500};
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    white-space: pre-wrap;
  }
`;

export const Wave = styled.img`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 45px;
`;
