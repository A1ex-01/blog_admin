import { ICP, IListRes, IPost } from '@/types';
import request from '.';

export const getBlogs = (params: ICP) => {
  return request.get<IListRes<IPost>>('/posts', params);
};

export const updatePostByUuid = (uuid: string, data: IPost) => {
  return request.put<IPost>(`/posts/${uuid}`, data);
};
