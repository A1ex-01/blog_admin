import { ACCESS_TOEKN } from '@/constants';
import { ILogin, UserDetail } from '@/types';
import request from '.';

export const login = (params: ILogin) => {
  return request.post<{
    [ACCESS_TOEKN]: string;
    user: UserDetail;
  }>(`/user/login`, params);
};

export const getInfo = () => {
  return request.get<UserDetail>(`/user/getInfo`, {});
};
