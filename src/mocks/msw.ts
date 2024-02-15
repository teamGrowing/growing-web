import { handlerInfoManager } from './HandlerInfoManager';

export async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./browser');
  handlerInfoManager.initHandlerInfo();

  // eslint-disable-next-line consistent-return
  return worker.start({ onUnhandledRequest: 'bypass' });
}
