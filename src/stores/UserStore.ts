import { makeAutoObservable } from 'mobx';
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
    const res = await USER_API.getUser(userId);
    this.user = res.data;

    if (!res.data.coupleId) return;
    const response = await COUPLE_API.getCouple(res.data.coupleId);
    this.petId = response.data.petId;
  }
}

const userStore = new UserStore();

export default userStore;
