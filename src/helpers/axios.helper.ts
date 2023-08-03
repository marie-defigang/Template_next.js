import axios from 'axios';
import qs from 'qs';
import { CONFIG } from '@constants/config.constants';

const executeSendRequest = (method: 'post' | 'patch' | 'put') => <T>(
  urlPath: string,
  body?: Record<string, unknown>,
) => {
  const url = `${CONFIG.API_URL}${urlPath}`;
  return axios[method]<T>(url, body ? { ...body } : undefined, { withCredentials: true }).then(({ data }) => data);
};
const executeGetRequest = (method: 'get' | 'delete') => <T>(
  urlPath: string,
  query?: Record<string, unknown> | null,
  headers?: Record<string, string>,
) => {
  let url = `${CONFIG.API_URL}${urlPath}`;
  if (query) {
    url += `?${qs.stringify(query, { encode: true, arrayFormat: 'brackets' })}`;
  }

  return axios[method]<T>(url, { withCredentials: true, headers }).then(({ data }) => data);
};

export const post = executeSendRequest('post');
export const patch = executeSendRequest('patch');
export const put = executeSendRequest('put');
export const get = executeGetRequest('get');
export const del = executeGetRequest('delete');

axios.interceptors.request.use((config) => config, (error) => Promise.reject(error));
