import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import Icon from 'components/common/Icon/Icon';
import { useCoupleData, usePetData } from 'hooks/queries';
import store from 'stores/RootStore';
import * as S from './PetLabel.styled';

const PetLabel = () => {
  const { userStore } = store;
  const navigation = useNavigate();

  const { data: couple } = useCoupleData({
    coupleId: userStore.user?.coupleId || '',
    options: {
      enabled: !!userStore.user?.coupleId,
    },
  });

  const { data: pet } = usePetData({
    coupleId: couple?.coupleId || '',
    petId: couple?.petId || '',
    options: {
      enabled: !!couple,
    },
  });

  return (
    <S.Container>
      <S.PetName>
        <S.Pin />
        {`${pet?.name ? pet.name : ''}`}
        <S.Pin />
      </S.PetName>

      {!pet?.name && (
        <Icon
          icon="IconPencil"
          size={20}
          style={{
            position: 'absolute',
            right: -30,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
          onClick={() => navigation('/pet/naming')}
        />
      )}
    </S.Container>
  );
};

PetLabel.Loading = () => {
  return <Skeleton width={90} height={33} borderRadius={10} />;
};

export default observer(PetLabel);
