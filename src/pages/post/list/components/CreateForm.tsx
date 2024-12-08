import { getFormCenterProps } from '@/utils';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { useForm } from 'antd/es/form/Form';

interface CreateFormProps {
  title: string;
  trigger: React.ReactElement;
}

export default function CreateForm(props: CreateFormProps) {
  const { title, trigger } = props;
  const [form] = useForm();
  return (
    <ModalForm
      {...getFormCenterProps('horizontal')}
      title={title}
      trigger={trigger}
      form={form}
    >
      <ProFormText name="title" label="标题" />
    </ModalForm>
  );
}
