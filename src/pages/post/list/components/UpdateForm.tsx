import NotionPageSelect from '@/components/NotionPageSelect';
import { IPost } from '@/types';
import { getFormCenterProps } from '@/utils';
import { ModalForm, ProFormDatePicker } from '@ant-design/pro-components';
import { useForm } from 'antd/es/form/Form';

interface UpdateFormProps {
  title: string;
  trigger: React.ReactElement;
  formVals: IPost;
  onSubmit: (values: IPost) => Promise<void>;
}

export default function UpdateForm(props: UpdateFormProps) {
  const { title, trigger, formVals, onSubmit } = props;
  console.log('🚀 ~ UpdateForm ~ formVals:', formVals);
  const [form] = useForm();
  return (
    <ModalForm<IPost>
      {...getFormCenterProps('horizontal')}
      title={title}
      trigger={trigger}
      form={form}
      initialValues={{ ...formVals }}
      onFinish={async (values) => {
        return await onSubmit(values);
      }}
    >
      {/* <ProFormText name={['notion', 'title']} disabled label="标题" /> */}
      <ProFormDatePicker
        rules={[{ required: true, message: '请选择发布时间' }]}
        name={'publishedAt'}
        label="发布时间"
      />
      <NotionPageSelect name={'notion_page_id'} />
    </ModalForm>
  );
}
