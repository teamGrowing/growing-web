import {
  QueryKey,
  useQuery,
  useMutation,
  UseMutationResult,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import queryKeys from '../../constants/queryKeys';
import { UseMutationOptionsType, UseQueryOptionsType } from '../../services';
import { PET_API } from '../../services/pet.service';
import { ChangePetDto } from '../../types/pet/ChangePet.dto';
import { PetDto } from '../../types/pet/Pet.dto';

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
