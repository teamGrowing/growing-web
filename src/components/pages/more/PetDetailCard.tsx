import styled, { keyframes } from 'styled-components';
import PetDto from '../../../types/more/Pet.dto';
import backgroundImg from '../../../assets/image/DetailCardBackground.png';
import infoBackgroundImg from '../../../assets/image/DetailInfoBackground.png';
import bearImg from '../../../assets/image/Bear.png'; // 임시로 넣어둠

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }

`;

const Background = styled.div`
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

  animation: 1s ${zoomIn};
`;

const Image = styled.div<{ petImg: string }>`
  position: absolute;
  width: 208px;
  height: 180px;
  left: 60px;
  top: 20px;
  background: url(${(props) => props.petImg});
  background-size: contain;
`;

const InfoContainer = styled.div`
  position: absolute;
  width: 308px;
  height: 288px;
  left: 0px;
  top: 172px;
  background-image: url(${infoBackgroundImg});
  background-size: contain;
`;

const Name = styled.div`
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

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px 60px;
  gap: 4px;
  position: absolute;
  width: 308px;
  height: 230px;
  left: 0px;
  top: 58px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0px;
  gap: 40px;
  width: 188px;
  height: 65px;
`;

const Info = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4px;
  gap: 3px;
  width: ${(props) => props.width};
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Title = styled.div`
  height: 17px;
  font-family: 'PretendardRegular';
  font-size: 14px;
  line-height: 17px;
`;

const Line = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 0.3px;
  background: ${({ theme }) => theme.color.purple300};
`;

const Content = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  font-family: 'PretendardLight';
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.black};
`;

type PetDetailCardProps = {
  petInfo: PetDto;
};

function PetDetailCard({ petInfo }: PetDetailCardProps) {
  const nickname = '별이';

  return (
    <Background>
      <Image petImg={bearImg} />
      <InfoContainer>
        <Name className="text-gradient400">{petInfo.name}</Name>
        <InfoBox>
          <Row>
            <Info width="77px">
              <Title className="text-gradient400">태어난 날</Title>
              <Line width="69px" />
              <Content width="69px">{petInfo.createdAt}</Content>
            </Info>
            <Info width="77px">
              <Title className="text-gradient400">독립한 날</Title>
              <Line width="69px" />
              <Content width="69px">{petInfo.endedAt}</Content>
            </Info>
          </Row>
          <Row>
            <Info width="188px">
              <Title className="text-gradient400">{nickname}에게 남긴말</Title>
              <Line width="180px" />
              <Content width="180px">{petInfo.description}</Content>
            </Info>
          </Row>
        </InfoBox>
      </InfoContainer>
    </Background>
  );
}
export default PetDetailCard;
