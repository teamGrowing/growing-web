import React from 'react';
import UserStore from './UserStore';

export type TStore = {
  userStore: UserStore;
};

const userStore = new UserStore();

export const Store: TStore = {
  userStore,
};

export const StoreContext = React.createContext<TStore | null>(null);

export function useStores() {
  const stores = React.useContext(StoreContext);
  if (!stores) {
    throw new Error('store error');
  }
  return stores;
}
