import { getGraduatedPetDetailHandler } from './getGraduatedPetDetailHandler';
import { getGraduatedPetsHandler } from './getGraduatedPetsHandler';
import {
  getPetHandler,
  postFeedPetHandler,
  postTouchPetHandler,
} from './petHandler';

export const PetHandlers = [
  getGraduatedPetDetailHandler,
  getGraduatedPetsHandler,
  getPetHandler,
  postFeedPetHandler,
  postTouchPetHandler,
];
