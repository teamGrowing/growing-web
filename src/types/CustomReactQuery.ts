import { AxiosResponse, AxiosError } from 'axios';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export interface UseInfiniteQueryOptionsType<T>
  extends UseInfiniteQueryOptions<
    AxiosResponse<T>,
    AxiosError,
    T,
    AxiosResponse<T>,
    QueryKey[]
  > {}

export interface UseQueryOptionsType<T>
  extends UseQueryOptions<AxiosResponse<T>, AxiosError, T, QueryKey[]> {}

export interface UseMutationOptionsType<T>
  extends UseMutationOptions<AxiosResponse, AxiosError, T, unknown> {}
