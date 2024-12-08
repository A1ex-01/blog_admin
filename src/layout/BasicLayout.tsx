import { siteConfig } from '@/config/site';
import { ACCESS_TOEKN } from '@/constants';
import useUserStore from '@/store/useUserStore';
import { GithubFilled, LogoutOutlined } from '@ant-design/icons';
import { ProConfigProvider, ProLayout } from '@ant-design/pro-components';
import { history, Outlet } from '@umijs/max';
import { ConfigProvider, Dropdown } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [pathname, setPathname] = useState('/');
  const { user, getInfo } = useUserStore();
  console.log('🚀 ~ user:', user);
  const initPath = () => {
    const path = history.location.pathname;
    setPathname(path);
  };
  useEffect(() => {
    getInfo();
    initPath();
  }, []);
  if (typeof document === 'undefined') {
    return <div />;
  }
  return (
    <div
      id="test-pro-layout"
      style={{
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ConfigProvider
          getTargetContainer={() => {
            return document.getElementById('test-pro-layout') || document.body;
          }}
        >
          <ProLayout
            layout="mix"
            fixSiderbar
            prefixCls="my-prefix"
            title={siteConfig.title}
            logo={siteConfig.logo}
            // {..._defaultProps}
            location={{
              pathname,
            }}
            route={{
              path: '/',
              routes: [
                {
                  path: '/',
                  name: '信息管理',
                  component: '@/layout/BasicLayout',
                  routes: [
                    {
                      name: '首页',
                      path: '/home',
                      component: './Home',
                    },

                    {
                      name: '博客列表',
                      path: '/blog',
                      component: './post/list/index',
                    },
                  ],
                },
              ],
            }}
            menuItemRender={(item, dom) => {
              return (
                <div
                  onClick={() => {
                    history.push(item.path || '/');
                    setPathname(item.path || '/');
                  }}
                >
                  {dom}
                </div>
              );
            }}
            token={{
              header: {
                colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
              },
            }}
            avatarProps={{
              src: user?.avatar,
              size: 'small',
              title: user?.nickname,
              render: (props, dom) => {
                return (
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: '退出登录',
                          onClick: () => {
                            localStorage.removeItem(ACCESS_TOEKN);
                            history.push('/login');
                          },
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                );
              },
            }}
            actionsRender={(props) => {
              if (props.isMobile) return [];
              if (typeof window === 'undefined') return [];
              return [
                <a
                  key="github"
                  href={'https://github.com/A1ex-01'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubFilled key="GithubFilled" />
                </a>,
              ];
            }}
            headerTitleRender={(logo, title, _) => {
              const defaultDom = (
                <a>
                  {logo}
                  {title}
                </a>
              );
              if (typeof window === 'undefined') return defaultDom;
              if (document.body.clientWidth < 1400) {
                return defaultDom;
              }
              if (_.isMobile) return defaultDom;
              return <>{defaultDom}</>;
            }}
            subMenuItemRender={(item, dom) => {
              return (
                <div
                  onClick={() => {
                    history.push(item.path || '/');
                    setPathname(item.path || '/');
                  }}
                >
                  {dom}
                </div>
              );
            }}
            menuFooterRender={(props) => {
              if (props?.collapsed) return undefined;
              return (
                <div
                  style={{
                    textAlign: 'center',
                    paddingBlockStart: 12,
                  }}
                >
                  <div>© 2024 Made with a1ex</div>
                  <div>by Ant Design Pro</div>
                </div>
              );
            }}
          >
            <Outlet />
          </ProLayout>
        </ConfigProvider>
      </ProConfigProvider>
    </div>
  );
};
