import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

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

export interface UseQueryOptionsType<T>
  extends UseQueryOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> {}

export interface UseMutationOptionsType<T>
  extends UseMutationOptions<AxiosResponse, AxiosError, T, unknown> {}
