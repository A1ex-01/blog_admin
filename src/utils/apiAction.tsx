import { message } from 'antd';

export const handleAdd = async (apiPromise: Promise<any>) => {
  const hide = message.loading('正在添加');
  try {
    const res = await apiPromise;
    hide();
    message.success('添加成功');
    return res;
  } catch (error) {
    hide();
    message.error('添加失败请重试');
    return false;
  }
};
