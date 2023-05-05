import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import useSignUp from 'hooks/user/useSignUp';
import Wave from 'components/pages/login/Wave';
import Egg from 'components/pages/login/Egg';
import LoginButton from 'components/pages/login/LoginButton';
import { SignUpFormValues, signUpSchema } from 'types/InputSchema';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;

  padding-left: 40px;
  padding-right: 40px;

  background-color: ${({ theme }) => theme.color.purple50};

  overflow: hidden;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
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

function LoginCreatePage() {
  const { userStore } = store;

  const { register, handleSubmit, formState } = useForm<SignUpFormValues>({
    resolver: yupResolver(signUpSchema.pick(['nickname'])),
  });

  const { getStringByType, patchUser } = useSignUp({
    userId: userStore.user?.id ?? '',
    partnerId: userStore.partnerId,
    formState,
  });

  return (
    <PageContainer className="page-container">
      <StyledForm onSubmit={handleSubmit((data) => patchUser(data))}>
        <LoginButton disabled ment={getStringByType().ment} />

        <StyledInput
          className="text-gradient400"
          type={getStringByType().inputType}
          {...register(getStringByType().inputSchema)}
        />
        <p className="text-gradient300">{getStringByType().errMsg ?? ''}</p>

        <Egg onClick={() => {}} />

        <div style={{ height: '100px' }} />
      </StyledForm>

      <Wave />
    </PageContainer>
  );
}

export default observer(LoginCreatePage);
