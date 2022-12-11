import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter<T extends RouterComponentProps>(
  Component: React.ComponentType<T>
) {
  function RouterComponent(props: Omit<T, keyof RouterComponentProps>) {
    return (
      <Component
        {...(props as T)}
        location={useLocation()}
        navigate={useNavigate()}
        params={useParams()}
      />
    );
  }
  return RouterComponent as any;
}

export default withRouter;
