import fetcher from '.';
import { ChangePetDto } from '../types/pet/ChangePet.dto';
import { PetDto } from '../types/pet/Pet.dto';
import { PetReactionDto } from '../types/pet/PetReaction.dto';
import { PostPetDto } from '../types/pet/PostPet.dto';
import { PostPetLineDto } from '../types/pet/PostPetLine.dto';

export const PET_API = {
  getPet: (coupleId: string, petId: string) =>
    fetcher.create().get<PetDto>(`couples/${coupleId}/pets/${petId}`),
  patchPet: (coupleId: string, data: ChangePetDto) =>
    fetcher.create().patch(`couples/${coupleId}`, data),
  postFeedPet: (coupleId: string, petId: string) =>
    fetcher
      .create()
      .post<PetReactionDto>(`couples/${coupleId}/pets/${petId}/feed`),
  postTouchPet: (coupleId: string, petId: string) =>
    fetcher
      .create()
      .post<PetReactionDto>(`couples/${coupleId}/pets/${petId}/touch`),
  getGraduatedPets: (coupleId: string) =>
    fetcher.create().get<PostPetLineDto[]>(`couples/${coupleId}/post-pets`),
  getGraduatedPetDetail: (coupleId: string, petId: string) =>
    fetcher
      .create()
      .get<PostPetDto[]>(`couples/${coupleId}/post-pets/${petId}`),
};

export default { PET_API };
