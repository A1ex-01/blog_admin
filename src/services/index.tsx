import { IRes } from '@/types';
import { request as requestIns } from '@umijs/max';
class Request {
  baseURL;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  get<T>(url: string, params: any) {
    return requestIns<IRes<T>>(url, {
      method: 'GET',
      params,
      baseURL: this.baseURL,
    });
  }
  post(url: string, params: any) {
    return requestIns(url, {
      method: 'POST',
      params,
      baseURL: this.baseURL,
    });
  }
  put(url: string, params: any) {
    return requestIns(url, {
      method: 'PUT',
      params,
      baseURL: this.baseURL,
    });
  }
  delete(url: string, params: any) {
    return requestIns(url, {
      method: 'DELETE',
      params,
      baseURL: this.baseURL,
    });
  }
}
const request = new Request('http://localhost:8004');
export default request;
