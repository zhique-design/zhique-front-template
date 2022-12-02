import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes, Navigate } from 'react-router-dom';

import routers from '@/config/routers';

import './global.less';

const RouteTable = (routeList) => {
  const routeTable: Array<any> = [];
  routeList.forEach(({ path, redirect, children, ...rest }) => {
    if (redirect) {
      routeTable.push({
        path,
        element: <Navigate to={redirect} />,
      });
    } else {
      routeTable.push({
        path,
        element: (
          <Suspense>
            <rest.component />
          </Suspense>
        ),
        children: children && RouteTable(children),
      });
    }
  });
  return routeTable;
};

const RouteMap = () => useRoutes(RouteTable(routers));

const ZhiQue: React.FC = () => (
  <BrowserRouter>
    <RouteMap />
  </BrowserRouter>
);

export default ZhiQue;
