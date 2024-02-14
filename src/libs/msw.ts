export async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('../mocks/browser');
  worker.start({ onUnhandledRequest: 'bypass' });
}
