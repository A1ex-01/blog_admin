import { SmileFilled } from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        component: '@/layouts/BlankLayout',
        routes: [
          {
            path: '/login',
            component: './login/index',
          },
          {
            path: '/',
            component: '@/layouts/BasicLayout',
            routes: [
              {
                path: '/',
                icon: <SmileFilled />,
                redirect: '/home',
              },
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
      },
    ],
  },
};
