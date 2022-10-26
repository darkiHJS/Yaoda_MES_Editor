import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layout/index',
      routes: [
        {
          path: '/',
          name: '欢迎页',
          component: '@/pages/index',
        },
      ],
    },
  ],
  fastRefresh: {},
});
