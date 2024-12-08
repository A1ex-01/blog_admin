import useCommonStore from '@/store/useCommonStore';
import { ProFormSelect } from '@ant-design/pro-components';
import { NamePath } from 'antd/es/form/interface';
interface NotionPageSelectProps {
  name: NamePath;
}

export default function NotionPageSelect({ name }: NotionPageSelectProps) {
  const { notionPages } = useCommonStore();
  return (
    <ProFormSelect
      label="选择Notion页面"
      name={name}
      options={notionPages.map((i) => ({
        label: i['properties']['名称']['title']?.[0]?.['plain_text'],
        key: i.id,
        value: i.id.replaceAll('-', ''),
      }))}
      rules={[{ required: true, message: '请选择Notion页面' }]}
    />
  );
}
