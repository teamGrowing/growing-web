import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { USER_API } from '../../services/user.service';
import store from '../../stores/RootStore';
import { ChangeUserDto } from '../../types/user/CangeUser.dto';

export function usePutProfilePhotoMutation({
  userId,
  options,
}: {
  userId: string;
  options?: UseMutationOptions<AxiosResponse, AxiosError, string, unknown>;
}): UseMutationResult<AxiosResponse, AxiosError, string, unknown> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: string) =>
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
