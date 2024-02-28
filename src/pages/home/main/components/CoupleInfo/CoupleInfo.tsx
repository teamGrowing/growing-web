import { observer } from 'mobx-react';
import { FallbackProps } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import Icon from 'components/common/Icon/Icon';
import { useCoupleData } from 'hooks/queries';
import store from 'stores/RootStore';
import { chooseConjunction } from 'utils/Text';
import Spacing from 'components/common/Spacing';
import * as S from './CoupleInfo.styled';

const CoupleInfo = () => {
  const { userStore } = store;
  const { data: couple } = useCoupleData({
    coupleId: userStore.user?.coupleId ?? '',
  });

  return (
    <S.CoupleInfo>
      <S.Dday>D+{`${couple?.dayCount}`}</S.Dday>
      <S.NameWrapper>
        <S.StyledName>
          {`${couple?.myName}${chooseConjunction(couple?.myName ?? '')} ${
            couple?.partnerName
          } 🍭`}
        </S.StyledName>
      </S.NameWrapper>
    </S.CoupleInfo>
  );
};

CoupleInfo.Loading = () => {
  return (
    <S.CoupleInfo>
      <Skeleton
        height={46}
        width={120}
        baseColor="#f094ee40"
        highlightColor="#e5696970"
        borderRadius={14}
      />
      <S.NameWrapper>
        <Skeleton height={19} width={99} />
      </S.NameWrapper>
    </S.CoupleInfo>
  );
};

CoupleInfo.Error = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <S.CoupleInfo>
      <S.Dday onClick={resetErrorBoundary}>
        <S.RefreshButton>
          <Icon icon="IconRefresh" themeColor="gray700" />
        </S.RefreshButton>
      </S.Dday>
      <S.NameWrapper>
        <Spacing height={19} />
      </S.NameWrapper>
    </S.CoupleInfo>
  );
};

export default observer(CoupleInfo);
