import styled from 'styled-components';
import dayjs from 'dayjs';
import backgroundImg from '../../../assets/image/DetailCardBackground.png';
import infoBackgroundImg from '../../../assets/image/DetailInfoBackground.png';
import Icon from '../../common/Icon/Icon';
import store from '../../../stores/RootStore';
import { useGraduatedPetDetail } from '../../../hooks/queries/pet.queries';
import { clickPulse } from '../../../styles/common/keyframs';

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

  animation: 0.5s ${clickPulse};
`;

const Image = styled.div<{ petImg: string }>`
  position: absolute;
  width: 150px;
  height: 150px;
  left: 79px;
  top: 15px;
  background: url(${(props) => props.petImg}) no-repeat;
  background-size: contain;
  background-position: center;
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

const Info = styled.div<{ width: string }>`
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
  text-align: center;
  word-wrap: break-word;
  color: ${({ theme }) => theme.color.black};
`;

type PetDetailCardProps = {
  petId: string;
  onExit: React.MouseEventHandler;
};

function PetDetailCard({ petId, onExit }: PetDetailCardProps) {
  const { data } = useGraduatedPetDetail({
    coupleId: store.userStore.user?.coupleId!,
    petId,
    options: {
      suspense: false,
    },
  });

  return (
    <Background>
      <Icon
        icon="IconExit"
        style={{
          position: 'absolute',
          width: '24px',
          height: '24px',
          left: '277px',
          top: '9px',
        }}
        onClick={onExit}
      />
      <Image petImg={data?.imageUrl ?? ''} />
      <InfoContainer>
        <Name className="text-gradient400">
          {data?.name.length ? data.name : '그로잉펫'}
        </Name>
        <InfoBox>
          <Info width="77px">
            <Title className="text-gradient400">태어난 날</Title>
            <Line width="69px" />
            <Content width="69px">
              {dayjs(new Date(data?.createdAt ?? '')).format('YYYY/MM/DD')}
            </Content>
          </Info>
          <Info width="77px">
            <Title className="text-gradient400">독립한 날</Title>
            <Line width="69px" />
            <Content width="69px">
              {dayjs(new Date(data?.endedAt ?? '')).format('YYYY/MM/DD')}
            </Content>
          </Info>
          <Info width="188px">
            <Title className="text-gradient400">
              {store.userStore.user?.nickName!}에게 남긴말
            </Title>
            <Line width="180px" />
            <Content width="180px">{data?.description}</Content>
          </Info>
        </InfoBox>
      </InfoContainer>
    </Background>
  );
}
export default PetDetailCard;
