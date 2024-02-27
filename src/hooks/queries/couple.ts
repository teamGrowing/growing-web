import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from 'libs/react-query/queryKeys';
import {
  UseMutationOptionsType,
  UseQueryOptionsType,
} from 'types/CustomReactQuery';
import { COUPLE_API } from 'apis/couple';
import store from 'stores/RootStore';
import {
  ChangeCoupleDto,
  CoupleDto,
  CreateCoupleAndPetDto,
} from 'models/couple';

export function useCoupleData({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<CoupleDto>;
}) {
  return useQuery(
    [...queryKeys.coupleKeys.all, ...(storeCode ?? [])],
    () => COUPLE_API.getCouple(coupleId),
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
  options?: UseMutationOptionsType<ChangeCoupleDto>;
}): UseMutationResult<AxiosResponse, AxiosError, ChangeCoupleDto, unknown> {
  const queryClinet = useQueryClient();

  return useMutation({
    mutationFn: (data: ChangeCoupleDto) =>
      COUPLE_API.patchCouple(coupleId, data),
    onSuccess: () => {
      store.userStore.getUserData(store.userStore.user?.id!);
      queryClinet.invalidateQueries(queryKeys.albumKeys.all);
    },
    useErrorBoundary: false,
    ...options,
  });
}

export function useCreateCouple({
  options,
}: {
  options?: UseMutationOptions<
    AxiosResponse,
    AxiosError,
    CreateCoupleAndPetDto,
    unknown
  >;
}): UseMutationResult<
  AxiosResponse,
  AxiosError,
  CreateCoupleAndPetDto,
  unknown
> {
  return useMutation({
    mutationFn: (data) => COUPLE_API.postCouple(data),
    ...options,
  });
}
