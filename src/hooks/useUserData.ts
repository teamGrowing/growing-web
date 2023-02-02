import { useObserver } from 'mobx-react';
import { useStores } from '../stores/RootStore';

function useUserData() {
  const { userStore } = useStores();

  return useObserver(() => ({
    user: userStore.user,
    petId: userStore.petId,
  }));
}

export default useUserData;
