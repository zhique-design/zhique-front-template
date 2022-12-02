import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    return (
      <Component {...props} location={useLocation()} navigate={useNavigate()} />
    );
  }
  return ComponentWithRouterProp as any;
}

export default withRouter;
