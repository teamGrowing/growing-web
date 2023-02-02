import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

const token = localStorage.getItem('Access');

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_SERVER_HOST,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
};

const fetcher = axios.create(config);

export default fetcher;

export interface UseQueryOptionsType<T>
  extends UseQueryOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> {}
