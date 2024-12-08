import { INotionPage } from '@/types/notion';
import request from '.';

export const getNotionPagesById = (id: string) => {
  return request.get<INotionPage[]>(`/notion/${id}`, {});
};
