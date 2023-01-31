import { QueryKey, useQuery } from '@tanstack/react-query';
import queryKeys from '../../constants/queryKeys';
import { UseQueryOptionsType } from '../../services';
import { PET_API } from '../../services/pet.service';
import { PetDto } from '../../types/pet/Pet.dto';

function usePetData({
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

export default usePetData;
