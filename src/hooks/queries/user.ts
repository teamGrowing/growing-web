import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from 'constants/queryKeys';
import { UseQueryOptionsType } from 'types/CustomReactQuery';
import { USER_API } from 'apis/user';
import AUTH_API from 'apis/auth';
import store from 'stores/RootStore';
import {
  ChangeUserDto,
  ResultDto,
  VerifyCodeDto,
  VerifyCodeResponseDto,
} from 'models/user';
import { KakaoCodeDto, LogInResultDto } from 'models/auth';

export function usePutProfilePhotoMutation({
  userId,
  options,
}: {
  userId: string;
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    string | null,
    unknown
  >;
}): UseMutationResult<AxiosResponse, AxiosError, string | null, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string | null) =>
      USER_API.putProfilePhoto(userId, { imageId }),
    onSuccess: () => {
      queryClient.invalidateQueries([...queryKeys.userKeys.all]);
      store.userStore.getUserData(userId);
    },
    ...options,
  });
}

export function usePatchUserInfoMutation({
  userId,
  options,
}: {
  userId: string;
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    ChangeUserDto,
    unknown
  >;
}): UseMutationResult<AxiosResponse, AxiosError, ChangeUserDto, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userInfo: ChangeUserDto) =>
      USER_API.patchUser(userId, userInfo),
    onSuccess: () => {
      store.userStore.getUserData(userId);
      queryClient.invalidateQueries([...queryKeys.userKeys.all]);
    },
    ...options,
  });
}

export function useUserIsCouple({
  userId,
  storeCode,
  options,
}: {
  userId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<ResultDto>;
}) {
  return useQuery(
    [...queryKeys.userKeys.isCouple, ...(storeCode ?? [])],
    () => USER_API.getUserIsCouple(userId),
    {
      select: ({ data }) => data,
      ...options,
    }
  );
}

export function useCodyVerify({
  options,
}: {
  options?: UseMutationOptions<
    AxiosResponse<VerifyCodeResponseDto>,
    AxiosError,
    VerifyCodeDto,
    unknown
  >;
}): UseMutationResult<
  AxiosResponse<VerifyCodeResponseDto>,
  AxiosError,
  VerifyCodeDto,
  unknown
> {
  return useMutation({
    mutationFn: (code) => USER_API.postCodeVerify(code),
    ...options,
  });
}

export function useKakaoLogin({
  options,
}: {
  options?: UseMutationOptions<
    AxiosResponse<LogInResultDto>,
    AxiosError,
    KakaoCodeDto,
    unknown
  >;
}): UseMutationResult<
  AxiosResponse<LogInResultDto>,
  AxiosError,
  KakaoCodeDto,
  unknown
> {
  return useMutation({
    mutationFn: (data) => AUTH_API.login(data),
    ...options,
  });
}
