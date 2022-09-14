import React from 'react';
import { Redirect, Route, routerRedux, Switch } from 'dva/router';
import { v4 as uuid4 } from 'uuid';
import dynamic from 'dva/dynamic';

import { ConnectedRouterProps } from 'react-router-redux';

import routers from '@/config/routers';

import './global.less';

const { ConnectedRouter } = routerRedux;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line no-underscore-dangle
  !app._models.some(({ namespace }) => namespace === model.substring(model.lastIndexOf('/') + 1));

// @ts-ignore
export const dynamicWrapper = ({ models=[], component, ...dynamics } : { models?: Array<string>, component: any }) =>
  dynamic({
    // @ts-ignore
    app: window.dvaApp,
    models: () =>
      models.filter(model => modelNotExisted(window.dvaApp, model)).map(m => import(`@/models/${m}`)),
    component,
    ...dynamics
  }) as any;

const RouteMap = routeList => routeList.map(({ path, component, redirect, children, ...dynamics }) => {
  if (redirect) {
    return <Redirect key={uuid4()} from={path} to={redirect} />;
  }
  if (children) {
    const Component = dynamicWrapper({
      component,
      ...dynamics
    });
    return (
      <Route
        key={uuid4()}
        path={path}
        render={props => (<Component {...props}><Switch>{RouteMap(children)}</Switch></Component>)}
      />
    );
  }
  const Component = dynamicWrapper({
    component,
    ...dynamics
  });
  return <Route key={uuid4()} path={path} exact component={Component} />;
});

const ZhiQue: React.FC<ConnectedRouterProps<{}>> = props => (
  <ConnectedRouter {...props}>
    <Switch>
      {RouteMap(routers)}
    </Switch>
  </ConnectedRouter>
);

export default ZhiQue;
