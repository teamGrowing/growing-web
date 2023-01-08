import axios, { AxiosRequestConfig } from 'axios';

const token = localStorage.getItem('Access');

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_SERVER_HOST,
  headers: {
    Authorization: token ? `Bearer ${token}` : null,
  },
};

const fetcher = axios.create(config);

export default fetcher;
