/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import store from '../../stores/RootStore';
import { MENT_LOGIN } from '../../constants/ments';
import { useCodyVerify } from '../../hooks/queries/user.queries';
import Wave from '../../components/pages/login/Wave';
import Egg from '../../components/pages/login/Egg';
import LoginButton from '../../components/pages/login/LoginButton';
import { CodeFormValues, codeSchema } from '../../types/InputSchema';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  padding-left: 40px;
  padding-right: 40px;

  background-color: ${({ theme }) => theme.color.purple50};
`;

const StyledInput = styled.input`
  margin-top: 20px;
  padding-bottom: 12px;

  width: 100%;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.color.purple600};

  font-size: 19px;
  text-align: center;
`;

function LoginInvitedPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CodeFormValues>({ resolver: yupResolver(codeSchema) });

  const navigation = useNavigate();
  const { userStore } = store;

  const { mutate: verifyCode } = useCodyVerify({
    options: {
      onSuccess({ data }) {
        if (!!data.partnerId) {
          userStore.updatePartnerId(data.partnerId);
          navigation('/login/create', { replace: true });
        }
      },
    },
  });

  const onSubmit = handleSubmit(({ code }) => {
    verifyCode({ code });
    navigation('/login/create', { replace: true });
  });

  return (
    <form onSubmit={onSubmit}>
      <PageContainer className="page-container">
        <LoginButton disabled ment={MENT_LOGIN.INVITED_INPUT} />

        <StyledInput
          className="text-gradient400"
          type="string"
          {...register('code')}
        />
        <p className="text-gradient300">{errors?.code?.message}</p>

        <Egg onClick={() => {}} />
        <div style={{ height: '100px' }} />
        <Wave />
      </PageContainer>
    </form>
  );
}

export default observer(LoginInvitedPage);
