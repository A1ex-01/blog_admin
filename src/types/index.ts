import { ProColumns } from '@ant-design/pro-components';
import { NamePath } from 'antd/es/form/interface';

export interface ICP {
  current: number;
  pageSize: number;
}
export interface IRes<T> {
  data: T;
  message: string;
  success: boolean;
}
export interface IListRes<T = any> extends ICP {
  total: number;
  list: T[];
}
export interface IPost {
  id: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  publishedAt: string;
  notion_page_id: string;
  userDetail: UserDetail;
  notionDetail: INotionDetail;
}
export interface INotionDetail {
  page_id: string;
  title: string;
  cover_url: string;
  content: string;
  created_at: string;
  updated_at: string;
  category?: ICategory;
  tags?: ITag[];
}

export interface ITag {
  id: string;
  name: string;
  color: string;
}
export interface ICategory {
  id: string;
  name: string;
  color: string;
}
export interface UserDetail {
  id: string;
  username: string;
  nickname: string;
  email: string;
  age: null;
  mobile: string;
  birthday: null;
  desc: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface ILogin {
  username: string;
  password: string;
}

interface ProColumnsExtendedField<T> {
  dataIndex?: NamePath<T>;
}
export type ExtendedProColumns<T> = Omit<ProColumns<T>, 'dataIndex'> &
  ProColumnsExtendedField<T>;
