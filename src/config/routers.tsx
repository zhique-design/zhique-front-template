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
      },
    ],
  },
];

export default config;
