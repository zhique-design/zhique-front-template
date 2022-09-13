import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { v4 as uuid4 } from "uuid";
import routers from "@/config/routers";
import "./global.less";

const RouteMap = (routeList) =>
  routeList.map(({ path, element, redirect, children }) => {
    if (redirect) {
      return (
        <Route key={uuid4()} path={path} element={<Navigate to={redirect} />} />
      );
    }
    if (children)
      return (
        <Route key={uuid4()} path={path} element={element}>
          {RouteMap(children)}
        </Route>
      );
    return <Route key={uuid4()} path={path} element={element} />;
  });

const ZhiQue: React.FC = () => (
  <Router>
    <Routes>{RouteMap(routers)}</Routes>
  </Router>
);

export default ZhiQue;
