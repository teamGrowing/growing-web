import { deletePlanHandler } from './deletePlanHandler';
import { getPlansHandler } from './getPlansHandler';
import { patchPlanHandler } from './patchPlanHandler';
import { postPlanHandler } from './postPlanHandler';

export const PlanHandlers = [
  getPlansHandler,
  postPlanHandler,
  patchPlanHandler,
  deletePlanHandler,
];
