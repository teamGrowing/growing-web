import { action, makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import { COUPLE_API } from 'apis/couple';
import { USER_API } from 'apis/user';
import { UserDto } from 'types/user/User.dto';
import AUTH_API from 'apis/auth';
import fetcher from 'apis/fetcher';

class UserStore {
  user: UserDto | null = null;

  petId: string | null = null;

  partnerId: string | null = null; // 커플 연결시 필요한 필드

  refreshTimer: NodeJS.Timer | undefined;

  refreshInterval = 55 * 60_000;

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

  updatePartnerId(id: string) {
    this.partnerId = id;
  }

  setRefreshTimer() {
    this.refreshTimer = setInterval(async () => {
      const token = Cookies.get('refresh');
      if (token) {
        const { data } = await AUTH_API.refresh(token);
        Cookies.set('refresh', data.refreshToken);
        fetcher.setAccessToken(data.accessToken);
      } else {
        clearInterval(this.refreshTimer);
        this.logout();
      }
    }, this.refreshInterval);
  }

  logout() {
    this.user = null;
    this.petId = null;
    this.partnerId = null;
    document.cookie = `refresh=;expires=-1;;path=/;`;
    clearInterval(this.refreshTimer);
  }
}

const userStore = new UserStore();

export default userStore;
