import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function withRouter<T extends RouterComponentProps>(
  Component: React.ComponentType<T>
) {
  function RouterComponent(props: Omit<T, keyof RouterComponentProps>) {
    return (
      <Component
        {...(props as T)}
        location={useLocation()}
        navigate={useNavigate()}
      />
    );
  }
  return RouterComponent as any;
}

export default withRouter;
