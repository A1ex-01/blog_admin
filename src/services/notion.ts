import { ICP, IListRes, IPost } from '@/types';
import request from '.';

export const getNotionPagesById = (id: string, params: ICP) => {
  return request.get<IListRes<IPost>>(`/notion/${id}`, params);
};
