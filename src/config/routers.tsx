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
            path: '/console/article/edit/:articleId',
            component: lazy(() => import('@/pages/Article/ArticleEdit')),
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
