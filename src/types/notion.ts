export interface INotionPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: Createdby;
  last_edited_by: Createdby;
  cover: null;
  icon: null;
  parent: Parent;
  archived: boolean;
  in_trash: boolean;
  properties: Properties;
  url: string;
  public_url: null;
}
interface Properties {
  状态: INotionPageStatus;
  分类: INotionPageCategory;
  标签: INotionPageTag;
  创建时间: INotionCreatedAt;
  更新时间: INotionPageUpdatedAt;
  名称: INotionPageName;
  开始时间: INotionPageStartTime;
}
interface INotionPageStartTime {
  id: string;
  type: string;
  date: null;
}
interface INotionPageName {
  id: string;
  type: string;
  title: Title[];
}
interface Title {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
}
interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}
interface Text {
  content: string;
  link: null;
}
interface INotionPageUpdatedAt {
  id: string;
  type: string;
  last_edited_time: string;
}
interface INotionCreatedAt {
  id: string;
  type: string;
  created_time: string;
}
interface INotionPageTag {
  id: string;
  type: string;
  multi_select: any[];
}
interface INotionPageCategory {
  id: string;
  type: string;
  select: null;
}
interface INotionPageStatus {
  id: string;
  type: string;
  status: Status;
}
interface Status {
  id: string;
  name: string;
  color: string;
}
interface Parent {
  type: string;
  database_id: string;
}
interface Createdby {
  object: string;
  id: string;
}
