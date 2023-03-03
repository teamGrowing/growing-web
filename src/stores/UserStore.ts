import { action, makeAutoObservable } from 'mobx';
import { COUPLE_API } from '../services/couple.service';
import { USER_API } from '../services/user.service';
import { UserDto } from '../types/user/User.dto';

class UserStore {
  user: UserDto | null = null;

  petId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async getUserData(userId: string) {
    await USER_API.getUser(userId).then(
      action('fetchUser_Success', (res) => {
        this.user = res.data;
      })
    );

    if (!this.user?.coupleId) return;

    await COUPLE_API.getCouple(this.user.coupleId).then(
      action('fetchCouple_Success', (response) => {
        this.petId = response.data.petId;
      })
    );
  }
}

const userStore = new UserStore();

export default userStore;
