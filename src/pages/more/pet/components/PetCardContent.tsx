import Skeleton from 'react-loading-skeleton';
import { FallbackProps } from 'react-error-boundary';
import { useGraduatedPetDetail } from 'hooks/queries';
import store from 'stores/RootStore';
import dayjs from 'dayjs';
import { observer } from 'mobx-react';
import { MENT_COMMON } from 'constants/ments';
import * as S from './PetCardContent.styled';

interface Props {
  petId: string;
}

const PetCardContent = ({ petId }: Props) => {
  const { data } = useGraduatedPetDetail({
    coupleId: store.userStore.user?.coupleId!,
    petId,
  });

  return (
    <>
      <S.Image petImg={data?.imageUrl} />
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
    </>
  );
};

PetCardContent.Loading = () => {
  return (
    <>
      <S.Image>
        <Skeleton
          width={80}
          height={80}
          circle
          baseColor="#fce38a33"
          highlightColor="f3818133"
        />
      </S.Image>
      <S.InfoContainer>
        <S.Name className="text-gradient400">
          <Skeleton
            width={100}
            baseColor="#fce38a33"
            highlightColor="f3818133"
            borderRadius={10}
          />
        </S.Name>
        <S.InfoBox>
          <S.Info width="77px">
            <Skeleton
              width={50}
              baseColor="#fce38a33"
              highlightColor="f3818133"
              borderRadius={10}
            />
            <S.Content width="69px">
              <Skeleton
                width={70}
                baseColor="#fce38a33"
                highlightColor="f3818133"
                borderRadius={10}
              />
            </S.Content>
          </S.Info>
          <S.Info width="77px">
            <Skeleton
              width={50}
              baseColor="#fce38a33"
              highlightColor="f3818133"
              borderRadius={10}
            />
            <S.Content width="69px">
              <Skeleton
                width={70}
                baseColor="#fce38a33"
                highlightColor="f3818133"
                borderRadius={10}
              />
            </S.Content>
          </S.Info>
          <S.Info width="188px">
            <Skeleton
              width={100}
              baseColor="#fce38a33"
              highlightColor="f3818133"
              borderRadius={10}
            />
            <Skeleton
              width={180}
              baseColor="#fce38a33"
              highlightColor="f3818133"
              borderRadius={10}
            />
          </S.Info>
        </S.InfoBox>
      </S.InfoContainer>
    </>
  );
};

PetCardContent.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <S.InfoContainer>
        <S.ErrorContainer>
          <S.ErrorMessage>오류가 발생했습니다.</S.ErrorMessage>
          <S.Button onClick={resetErrorBoundary}>{MENT_COMMON.RETRY}</S.Button>
        </S.ErrorContainer>
      </S.InfoContainer>
    </>
  );
};

export default observer(PetCardContent);
