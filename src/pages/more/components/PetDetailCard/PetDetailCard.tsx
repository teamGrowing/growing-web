import dayjs from 'dayjs';
import Icon from 'components/common/Icon/Icon';
import store from 'stores/RootStore';
import { useGraduatedPetDetail } from 'hooks/queries';
import * as S from './PetDetailCard.styled';

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
    <S.Background>
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
      <S.Image petImg={data?.imageUrl ?? ''} />
      <S.InfoContainer>
        <S.Name className="text-gradient400">
          {data?.name.length ? data.name : '그로잉펫'}
        </S.Name>
        <S.InfoBox>
          <S.Info width="77px">
            <S.Title className="text-gradient400">태어난 날</S.Title>
            <S.Line width="69px" />
            <S.Content width="69px">
              {dayjs(new Date(data?.createdAt ?? '')).format('YYYY/MM/DD')}
            </S.Content>
          </S.Info>
          <S.Info width="77px">
            <S.Title className="text-gradient400">독립한 날</S.Title>
            <S.Line width="69px" />
            <S.Content width="69px">
              {dayjs(new Date(data?.endedAt ?? '')).format('YYYY/MM/DD')}
            </S.Content>
          </S.Info>
          <S.Info width="188px">
            <S.Title className="text-gradient400">
              {store.userStore.user?.nickName!}에게 남긴말
            </S.Title>
            <S.Line width="180px" />
            <S.Content width="180px">{data?.description}</S.Content>
          </S.Info>
        </S.InfoBox>
      </S.InfoContainer>
    </S.Background>
  );
}
export default PetDetailCard;
