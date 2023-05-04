import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import store from '../../stores/RootStore';
import { MENT_LOGIN } from '../../constants/ments';
import Wave from '../../components/pages/login/Wave';
import { ImgPetsWaiting } from '../../assets/image';
import { useUserIsCouple } from '../../hooks/queries/user.queries';
import useToast from '../../hooks/common/useToast';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 160px;

  background-color: ${({ theme }) => theme.color.purple50};

  overflow: hidden;
`;

const StyledText = styled.p`
  font-size: 19px;
  font-weight: 600;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const SharedBtn = styled.button`
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 4px;
  padding: 4px 10px;

  color: ${({ theme }) => theme.color.purple600};
`;

const StyledImg = styled.img`
  width: 240px;
  margin-left: -10px;
`;

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
    <PageContainer className="page-container">
      <StyledText className="text-gradient400">{MENT_LOGIN.WAITING}</StyledText>
      <StyledImg src={ImgPetsWaiting} alt="pets" />
      <Info>
        <p className="text-gradient400">
          나의 코드: {userStore.user?.code ?? ''}
        </p>
        <CopyToClipboard
          text={userStore.user?.code ?? ''}
          onCopy={() => addToast(MENT_LOGIN.COPY)}
        >
          <SharedBtn>복사</SharedBtn>
        </CopyToClipboard>
      </Info>
      <Wave />
    </PageContainer>
  );
}

export default observer(LoginWaitingPage);
