// 表单居中
export const getFormCenterProps = (
  layout: 'vertical' | 'horizontal' = 'vertical',
) => {
  return {
    width: 600,
    labelCol: {
      span: 6,
      push: layout === 'vertical' ? 3 : 0,
    },
    modalProps: { destroyOnClose: true },
    wrapperCol: {
      span: 16,
      offset: layout === 'vertical' ? 4 : 0,
    },
    layout,
  };
};
