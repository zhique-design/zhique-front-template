import { lazy } from 'react';

export interface RouterConfig {
  path?: string;
  redirect?: string;
  component?: any;
  children?: Array<RouterConfig>;
}

const config: Array<RouterConfig> = [
  {
    path: '/',
    component: lazy(() => import('@/layouts/GlobalLayout')),
    children: [
      {
        path: '/console',
        component: lazy(() => import('@/layouts/ConsoleLayout')),
        children: [
          {
            path: '/console/blog/article',
            redirect: '/console/blog/article/list',
          },
          {
            path: '/console/blog/article/list',
            component: lazy(() => import('@/pages/Console/Blog/Article/List')),
          },
          {
            path: '/console/blog/article/edit',
            component: lazy(() => import('@/pages/Console/Blog/Article/Edit')),
          },
          {
            path: '/console/blog/article/edit/:articleId',
            component: lazy(() => import('@/pages/Console/Blog/Article/Edit')),
          },
        ],
      },
      {
        component: lazy(() => import('@/pages/404')),
      },
    ],
  },
];

export default config;
