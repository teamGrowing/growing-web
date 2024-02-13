import { useNavigate } from 'react-router-dom';
import { HTMLInputTypeAttribute, useState } from 'react';
import { FormState } from 'react-hook-form';
import { MENT_LOGIN } from 'constants/ments';
import { SignUpFormValues, SignUpType } from 'types/InputSchema';
import {
  usePatchUserInfoMutation,
  useCreateCouple,
} from '../../../hooks/queries';

type TypeByLevel = {
  ment: string;
  inputSchema: SignUpType;
  inputType: HTMLInputTypeAttribute;
  errMsg: string | undefined;
};

export default function useSignUp({
  userId,
  partnerId,
  formState,
}: {
  userId: string;
  partnerId: string | null;
  formState: FormState<SignUpFormValues>;
}) {
  const [step, setStep] = useState<number>(0); // 0: 닉네임, 1: 생일, 2: 기념일
  const navigation = useNavigate();

  const { mutateAsync: patchUserInfo } = usePatchUserInfoMutation({
    userId,
  });

  const { mutateAsync: createCouple } = useCreateCouple({
    options: {
      onSuccess() {
        navigation('/login/born', { replace: true });
      },
    },
  });

  const getStringByType = (): TypeByLevel => {
    switch (step) {
      case 0:
        return {
          ment: MENT_LOGIN.NICKNAME,
          inputSchema: SignUpType.NICKNAME,
          inputType: 'string',
          errMsg: formState.errors.nickname?.message,
        };
      case 1:
        return {
          ment: MENT_LOGIN.BIRTH,
          inputSchema: SignUpType.BIRTHDAY,
          inputType: 'Date',
          errMsg: formState.errors.birthday?.message,
        };
      case 2:
      default: // FIXME
        return {
          ment: MENT_LOGIN.ANNIVERSARY,
          inputSchema: SignUpType.ANNIVERSARY,
          inputType: 'Date',
          errMsg: formState.errors.anniversary?.message,
        };
    }
  };

  const patchUser = async (data: SignUpFormValues) => {
    switch (step) {
      case 0:
        setStep(1);
        break;
      case 1:
        await patchUserInfo({
          nickName: data.nickname,
          birthDay: new Date(data.birthday),
        });
        setStep(2);
        break;
      case 2: // TODO: input창 reset
        // 연인에게 공유하기 버튼 누른 경우
        if (!partnerId) {
          navigation('/login/waiting', { replace: true });
          return;
        }

        // 초대받은 경우
        await createCouple({
          anniversaryDay: new Date(data.anniversary).toISOString(),
          partnerId,
        });
        navigation('/login/born', { replace: true });
        break;
      default:
    }
  };

  return {
    getStringByType,
    patchUser,
  };
}
