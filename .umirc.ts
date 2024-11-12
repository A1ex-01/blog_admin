import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Blog Management',
  },
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

  npmClient: 'pnpm',
  tailwindcss: {},
});
