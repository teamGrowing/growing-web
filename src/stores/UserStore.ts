import { USER_API } from '../services/user.service';
import { UserDto } from '../types/user/User.dto';

class UserStore {
  user: UserDto | null = null;

  petId: string | null = null;

  async getUserData(userId: string) {
    await USER_API.getUser(userId).then((res) => {
      this.user = res.data;
    });
  }
}

export default UserStore;
