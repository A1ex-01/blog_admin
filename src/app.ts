// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'Blog Management' };
}

export const layout = () => {
  return {
    logo: 'http://a1ex.vip/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.96443187.png&w=64&q=75',
    menu: {
      locale: false,
    },
  };
};
