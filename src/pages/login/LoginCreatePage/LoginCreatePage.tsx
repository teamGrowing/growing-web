import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observer } from 'mobx-react';
import store from 'stores/RootStore';
import useSignUp from 'hooks/user/useSignUp';
import Wave from 'components/pages/login/Wave/Wave';
import Egg from 'components/pages/login/Egg/Egg';
import LoginButton from 'components/pages/login/LoginButton/LoginButton';
import { SignUpFormValues, signUpSchema } from 'types/InputSchema';
import * as S from './LoginCreatePage.styled';

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
    <S.PageContainer className="page-container">
      <S.StyledForm onSubmit={handleSubmit((data) => patchUser(data))}>
        <LoginButton disabled ment={getStringByType().ment} />

        <S.StyledInput
          className="text-gradient400"
          type={getStringByType().inputType}
          {...register(getStringByType().inputSchema)}
        />
        <p className="text-gradient300">{getStringByType().errMsg ?? ''}</p>

        <Egg onClick={() => {}} />

        <div style={{ height: '100px' }} />
      </S.StyledForm>

      <Wave />
    </S.PageContainer>
  );
}

export default observer(LoginCreatePage);
