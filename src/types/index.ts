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
  deletedAt: null;
  notion_page_id: string;
  userDetail: UserDetail;
  notion: Notion;
}
export interface Notion {
  pageId: string;
  cover: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  category: Tag;
  content: string;
}
export interface Tag {
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
