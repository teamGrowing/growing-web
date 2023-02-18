import { QueryKey, useQuery } from '@tanstack/react-query';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import { PET_API } from '../../services/pet.service';
import PostPetDto from '../../types/more/PostPet.dto';
import { PetDto } from '../../types/pet/Pet.dto';
import { PostPetLineDto } from '../../types/pet/PostPetLine.dto';

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

export function useGraduatedPets({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<PostPetLineDto[]>;
}) {
  return useQuery(
    [...queryKeys.petKeys.all, ...(storeCode ?? [])],
    () => PET_API.getGraduatedPets(coupleId),
    {
      select: ({ data }) => data,
      suspense: true,
      ...options,
    }
  );
}

export function useGraduatedPetDetail({
  coupleId,
  petId,
  storeCode,
  options,
}: {
  coupleId: string;
  petId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<PostPetDto>;
}) {
  return useQuery(
    [...queryKeys.petKeys.all, ...(storeCode ?? [])],
    () => PET_API.getGraduatedPetDetail(coupleId, petId),
    {
      select: ({ data }) => data,
      suspense: true,
      ...options,
    }
  );
}
