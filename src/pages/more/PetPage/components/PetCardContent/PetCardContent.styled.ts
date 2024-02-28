import styled from 'styled-components';
import { clickPulse } from 'styles/common/animation';
import backgroundImg from 'assets/image/DetailCardBackground.png';
import infoBackgroundImg from 'assets/image/DetailInfoBackground.png';

export const Background = styled.div`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 175px;
  width: 308px;
  height: 460px;
  background-image: url(${backgroundImg});
  background-size: contain;
  border-radius: 20px 20px 0px 0px;

  animation: 0.5s ${clickPulse};
`;

export const Image = styled.div<{ petImg?: string }>`
  position: absolute;
  width: 150px;
  height: 150px;
  left: 79px;
  top: 15px;
  background: url(${(props) => props.petImg}) no-repeat;
  background-size: contain;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InfoContainer = styled.div`
  position: absolute;
  width: 308px;
  height: 288px;
  left: 0px;
  top: 172px;
  background-image: url(${infoBackgroundImg});
  background-size: contain;
`;

export const Name = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 30px;
  gap: 10px;
  font-family: 'PretendardMedium';
  font-size: 19px;
  line-height: 23px;

  position: absolute;
  width: 308px;
  height: 58px;
  left: 0px;
  top: 0px;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  padding: 18px 40px;
  gap: 4px;
  position: absolute;
  width: 308px;
  height: 190px;
  left: 0px;
  top: 58px;
`;

export const Info = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  gap: 3px;
  width: ${(props) => props.width};
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const Title = styled.div`
  height: 17px;
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

export const Line = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 0.3px;
  background: ${({ theme }) => theme.color.purple300};
`;

export const Content = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  font-family: 'PretendardRegular';
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  word-wrap: break-word;
  color: ${({ theme }) => theme.color.gray600};
`;

export const Button = styled.button`
  margin: 30px;
  padding: 10px;

  background: ${({ theme }) => theme.color.gradient400};
  border: 1px solid ${({ theme }) => theme.color.gray50};
  border-radius: 30px;

  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.white};

  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.6;
  }
`;

export const ErrorContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  padding-top: 80px;
  justify-content: top;
  align-items: center;
`;

export const ErrorMessage = styled.div`
  font-family: PretendardBold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: ${({ theme }) => theme.color.gray600};
`;
