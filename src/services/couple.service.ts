import fetcher from '.';
import { ChangeCoupleDto } from '../types/couple/ChangeCouple.dto';
import { CoupleDto } from '../types/couple/Couple.dto';
import { CreateCoupleAndPetDto } from '../types/couple/CreateCoupleAndPet.dto';

export const COUPLE_API = {
  getCouple: (coupleId: string) =>
    fetcher.create().get<CoupleDto>(`couples/${coupleId}`),
  patchCouple: (coupleId: string, data: ChangeCoupleDto) =>
    fetcher.create().patch(`couples/${coupleId}`, data),
  deleteCouple: (coupleId: string) =>
    fetcher.create().delete(`couples/${coupleId}`),
  postCouple: (data: CreateCoupleAndPetDto) =>
    fetcher.create().post(`couples/create`, data),
};

export default { COUPLE_API };
