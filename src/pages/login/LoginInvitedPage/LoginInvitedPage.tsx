/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import { MENT_LOGIN } from 'constants/ments';
import { useCodyVerify } from 'hooks/queries';
import Wave from 'pages/login/components/Wave/Wave';
import Egg from 'pages/login/components/Egg/Egg';
import LoginButton from 'pages/login/components/LoginButton/LoginButton';
import { CodeFormValues, codeSchema } from 'types/InputSchema';
import * as S from './LoginInvitedPage.styled';

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
      <S.PageContainer className="page-container">
        <LoginButton disabled ment={MENT_LOGIN.INVITED_INPUT} />

        <S.StyledInput
          className="text-gradient400"
          type="string"
          {...register('code')}
        />
        <p className="text-gradient300">{errors?.code?.message}</p>

        <Egg onClick={() => {}} />
        <div style={{ height: '100px' }} />
        <Wave />
      </S.PageContainer>
    </form>
  );
}

export default observer(LoginInvitedPage);
