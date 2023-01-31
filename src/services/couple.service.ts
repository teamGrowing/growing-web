import fetcher from '.';
import { ChangeCoupleDto } from '../types/couple/ChangeCouple.dto';
import { CoupleDto } from '../types/couple/Couple.dto';
import { CreateCoupleAndPetDto } from '../types/couple/CreateCoupleAndPet.dto';

export const COUPLE_API = {
  getCouple: (coupleId: string) =>
    fetcher.get<CoupleDto>(`couples/${coupleId}`),
  patchCouple: (coupleId: string, data: ChangeCoupleDto) =>
    fetcher.patch(`couples/${coupleId}`, data),
  deleteCouple: (coupleId: string) => fetcher.delete(`couples/${coupleId}`),
  postCouple: (data: CreateCoupleAndPetDto) =>
    fetcher.post(`couples/create`, data),
};

export default { COUPLE_API };
