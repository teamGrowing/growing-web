import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import { COUPLE_API } from '../../services/couple.service';
import store from '../../stores/RootStore';
import { ChangeCoupleDto } from '../../types/couple/ChangeCouple.dto';
import { CoupleDto } from '../../types/couple/Couple.dto';

export function useCoupleData({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string | null | undefined;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<CoupleDto>;
}) {
  return useQuery(
    [...queryKeys.coupleKeys.all, ...(storeCode ?? [])],
    () => COUPLE_API.getCouple(`${coupleId ?? ''}`),
    {
      select: (data) => data.data,
      ...options,
    }
  );
}

export function usePatchCoupleMutation({
  coupleId,
  options,
}: {
  coupleId: string;
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    ChangeCoupleDto,
    unknown
  >;
}): UseMutationResult<AxiosResponse, AxiosError, ChangeCoupleDto, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangeCoupleDto) =>
      COUPLE_API.patchCouple(coupleId, data),
    onSuccess: () => {
      store.userStore.getUserData(store.userStore.user?.id!);
      queryClinet.invalidateQueries([...queryKeys.albumKeys.all]);
    },
    ...options,
  });
}
