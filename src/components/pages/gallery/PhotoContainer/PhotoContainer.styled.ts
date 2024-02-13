import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  text-align: center;
`;

export const Photos = styled.div`
  display: flex;
  margin: 1px 14px;
  gap: 1px 0;
  flex-wrap: wrap;

  & > div {
    width: 32%;
  }
`;

export const Logo = styled.div`
  margin: 0 auto;
  margin-top: 124px;

  z-index: 1;
`;

export const Message = styled.div`
  width: 100%;
  height: 62px;

  margin-top: 16px;

  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;

  text-align: center;

  background: ${({ theme }) => theme.color.gradient400};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  text-shadow: 0px 0px 8px rgba(151, 71, 255, 0.2);

  z-index: 0;
`;
