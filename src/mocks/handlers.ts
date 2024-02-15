import { CoupleHandlers } from './couple';
import { UserHandlers } from './user';

export const handlers = [...UserHandlers, ...CoupleHandlers];
