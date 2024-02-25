import styled from 'styled-components';
import Pet3DImg from 'pages/home/components/Pet3D';

export const PetFeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background: ${({ theme }) => theme.color.background};
`;

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
  background-color: ${({ theme }) => theme.color.gray50};
  border-radius: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

export const ActiveBar = styled.div<{ level: number }>`
  position: absolute;

  width: ${(props) => props.level}%;
  height: 23px;
  background: linear-gradient(
    130.11deg,
    rgba(113, 23, 234, 0.7) 7.3%,
    rgba(234, 96, 96, 0.7) 100%
  );
  border-radius: ${(props) => (props.level === 100 ? '20px' : '20px 0 0 20px')};
`;

export const PetContainer = styled.section`
  position: relative;

  display: flex;
  align-items: flex-end;

  padding: 0 30px;
`;

export const Pet = styled(Pet3DImg)`
  margin-bottom: 10px;
  z-index: 1;
`;

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
