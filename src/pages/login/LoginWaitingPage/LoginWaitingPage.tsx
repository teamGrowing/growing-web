import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import store from 'stores/RootStore';
import { MENT_LOGIN } from 'constants/ments';
import Wave from 'components/pages/login/Wave';
import { ImgPetsWaiting } from 'assets/image';
import { useUserIsCouple } from 'hooks/queries';
import useToast from 'hooks/common/useToast';
import * as S from './LoginWaitingPage.styled';

function LoginWaitingPage() {
  const navigation = useNavigate();
  const { userStore } = store;
  const { addToast } = useToast();

  const { data: isCouple } = useUserIsCouple({
    userId: userStore.user?.id ?? '',
    options: {
      // refetchInterval: (data) => (!data || !data.result ? 3000 : false),
      enabled: !!userStore.user?.id,
      suspense: false,
    },
  });

  useEffect(() => {
    if (!isCouple) return;
    if (!isCouple.result) return;
    navigation('/login/born', { replace: true });
  }, [isCouple]);

  return (
    <S.PageContainer className="page-container">
      <S.StyledText className="text-gradient400">
        {MENT_LOGIN.WAITING}
      </S.StyledText>
      <S.StyledImg src={ImgPetsWaiting} alt="pets" />
      <S.Info>
        <p className="text-gradient400">
          나의 코드: {userStore.user?.code ?? ''}
        </p>
        <CopyToClipboard
          text={userStore.user?.code ?? ''}
          onCopy={() => addToast(MENT_LOGIN.COPY)}
        >
          <S.SharedBtn>복사</S.SharedBtn>
        </CopyToClipboard>
      </S.Info>
      <Wave />
    </S.PageContainer>
  );
}

export default observer(LoginWaitingPage);
