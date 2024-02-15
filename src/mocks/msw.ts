import { handlerInfoManager } from './HandlerInfoManager';

export async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./browser');

  worker.start({ onUnhandledRequest: 'bypass' });
  handlerInfoManager.initHandlerInfo();
}
