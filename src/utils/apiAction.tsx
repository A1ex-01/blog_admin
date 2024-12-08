import { message } from 'antd';
import toast from 'react-hot-toast';

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

export const handleUpdate = async (apiPromise: Promise<any>) => {
  const toastId = toast.loading('正在更新');
  try {
    const res = await apiPromise;
    if (res.success) {
      toast.success('更新成功', { id: toastId });
    } else {
      toast.error('更新失败', { id: toastId });
    }
    return res;
  } catch (error) {
    toast.error('更新异常', { id: toastId });
    return {
      success: false,
    };
  }
};
