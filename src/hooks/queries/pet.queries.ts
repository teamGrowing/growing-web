import {
  QueryKey,
  useQuery,
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { UseMutationOptionsType, UseQueryOptionsType } from '../../services';
import { PET_API } from '../../services/pet.service';
import { ChangePetDto } from '../../types/pet/ChangePet.dto';
import { PetDto } from '../../types/pet/Pet.dto';
import { PetReactionDto } from '../../types/pet/PetReaction.dto';

export function usePetData({
  coupleId,
  petId,
  storeCode,
  options,
}: {
  coupleId: string;
  petId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<PetDto>;
}) {
  return useQuery(
    [...queryKeys.petKeys.all, ...(storeCode ?? [])],
    () => PET_API.getPet(coupleId, petId),
    {
      select: ({ data }) => data,
      suspense: true,
      ...options,
    }
  );
}

export function usePetNameMutation({
  coupleId,
  petId,
  options,
}: {
  coupleId: string | null | undefined;
  petId: string | null | undefined;
  options?: UseMutationOptionsType<ChangePetDto>;
}): UseMutationResult<AxiosResponse, AxiosError, ChangePetDto, unknown> {
  return useMutation({
    mutationFn: (dto: ChangePetDto) => PET_API.patchPet(coupleId, petId, dto),
    ...options,
  });
}

export function usePetFeedMutation({
  coupleId,
  petId,
  options,
}: {
  coupleId: string | null | undefined;
  petId: string | null | undefined;
  options?: UseMutationOptions<
    AxiosResponse<PetReactionDto>,
    AxiosError,
    unknown,
    unknown
  >;
}): UseMutationResult<
  AxiosResponse<PetReactionDto>,
  AxiosError,
  unknown,
  unknown
> {
  return useMutation({
    mutationFn: () => PET_API.postFeedPet(coupleId, petId),
    ...options,
  });
}

export function usePetPlayMutation({
  coupleId,
  petId,
  options,
}: {
  coupleId: string | null | undefined;
  petId: string | null | undefined;
  options?: UseMutationOptions<
    AxiosResponse<PetReactionDto>,
    AxiosError,
    unknown,
    unknown
  >;
}): UseMutationResult<
  AxiosResponse<PetReactionDto>,
  AxiosError,
  unknown,
  unknown
> {
  return useMutation({
    mutationFn: () => PET_API.postTouchPet(coupleId, petId),
    ...options,
  });
}

export function useGradutePet({
  coupleId,
  petId,
  options,
}: {
  coupleId: string;
  petId: string;
  options?: UseMutationOptions<
    AxiosResponse<PetDto>,
    AxiosError,
    unknown,
    unknown
  >;
}): UseMutationResult<AxiosResponse<PetDto>, AxiosError, unknown, unknown> {
  return useMutation({
    mutationFn: () => PET_API.postGraduate(coupleId, petId),
    ...options,
  });
}
