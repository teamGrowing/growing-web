import { CoupleHandlers } from './couple';
import { PetHandlers } from './pet';
import { UserHandlers } from './user';

export const handlers = [...UserHandlers, ...PetHandlers, ...CoupleHandlers];
