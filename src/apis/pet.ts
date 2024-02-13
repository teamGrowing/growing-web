import {
  ChangePetDto,
  PetDto,
  PetReactionDto,
  PostPetDto,
  PostPetLineDto,
} from 'models/pet';
import fetcher from './fetcher';

export const PET_API = {
  getPet: (coupleId: string, petId: string) =>
    fetcher.create().get<PetDto>(`couples/${coupleId}/pets/${petId}`),
  patchPet: (
    coupleId: string | null | undefined,
    petId: string | null | undefined,
    data: ChangePetDto
  ) => fetcher.create().patch(`couples/${coupleId}/pets/${petId}`, data),
  postFeedPet: (
    coupleId: string | null | undefined,
    petId: string | null | undefined
  ) =>
    fetcher
      .create()
      .post<PetReactionDto>(`couples/${coupleId}/pets/${petId}/feed`),
  postTouchPet: (
    coupleId: string | null | undefined,
    petId: string | null | undefined
  ) =>
    fetcher
      .create()
      .post<PetReactionDto>(`couples/${coupleId}/pets/${petId}/touch`),
  getGraduatedPets: (coupleId: string | null | undefined) =>
    fetcher.create().get<PostPetLineDto[]>(`couples/${coupleId}/post-pets`),
  getGraduatedPetDetail: (
    coupleId: string | null | undefined,
    petId: string | null | undefined
  ) =>
    fetcher.create().get<PostPetDto>(`couples/${coupleId}/post-pets/${petId}`),
  postGraduate: (coupleId: string, petId: string) =>
    fetcher.create().post(`couples/${coupleId}/pets/${petId}/graduate`),
};

export default { PET_API };
