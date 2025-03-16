import { ACCESS_TOEKN, errorCodeEnum } from '@/constants';
import { IRes } from '@/types';
import { history, request as requestIns } from '@umijs/max';
import toast from 'react-hot-toast';
function withError({
  success,
  code,
  message,
}: {
  success: boolean;
  code: number;
  message: string;
}) {
  if (!success) {
    toast.error(message);
  }
  if (code === errorCodeEnum.UNAUTHORIZED) {
    localStorage.removeItem(ACCESS_TOEKN);
    history.push('/login');
  }
}
class Request {
  baseURL;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  responseInterceptors = [
    (res) => {
      console.log('🚀 ~ Request ~ res:', res);
      withError(res?.data);
      return res;
    },
    (error) => {
      return error;
    },
  ];
  requestInterceptors = [
    (url: string, options: any) => {
      const token = localStorage.getItem(ACCESS_TOEKN);
      if (token) {
        if (options && options.headers) {
          options.headers.Authorization = `Bearer ${token}`;
        }
      }
      return { url, options };
    },
  ];
  get<T>(url: string, params: any) {
    return requestIns<IRes<T>>(url, {
      method: 'GET',
      params,
      baseURL: this.baseURL,
      responseInterceptors: this.responseInterceptors,
      requestInterceptors: this.requestInterceptors,
    });
  }
  post<T>(url: string, params: any) {
    return requestIns<IRes<T>>(url, {
      method: 'POST',
      data: params,
      baseURL: this.baseURL,
      responseInterceptors: this.responseInterceptors,
      requestInterceptors: this.requestInterceptors,
    });
  }
  put<T>(url: string, params: any) {
    return requestIns<T>(url, {
      method: 'PUT',
      data: params,
      baseURL: this.baseURL,
      responseInterceptors: this.responseInterceptors,
      requestInterceptors: this.requestInterceptors,
    });
  }
  delete(url: string, params: any) {
    return requestIns(url, {
      method: 'DELETE',
      data: params,
      baseURL: this.baseURL,
      responseInterceptors: this.responseInterceptors,
      requestInterceptors: this.requestInterceptors,
    });
  }
}
const baseUrl = 'http://106.54.215.126:8004';

// const baseUrl = 'http://localhost:8004';
const request = new Request(baseUrl);
export default request;
