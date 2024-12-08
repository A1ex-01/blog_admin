import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  routes: [
    {
      path: '/',
      component: '@/layout/BlankLayout',

      routes: [
        {
          path: '/login',
          component: './login/index',
          menuRender: false,
        },
        {
          path: '/',
          component: '@/layout/BasicLayout',
          routes: [
            {
              path: '/',
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

  npmClient: 'pnpm',
  tailwindcss: {},
});
