import axios, { AxiosRequestConfig } from 'axios';

class Fetcher {
  accessToken: string | undefined;

  create() {
    const config: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_SERVER_HOST,
      headers: {
        Authorization: this.accessToken ? `Bearer ${this.accessToken}` : null,
      },
    };

    return axios.create(config);
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
}

const fetcher = new Fetcher();

export default fetcher;
