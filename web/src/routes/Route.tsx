import React from 'react';
import { Route as ReactDOMRoute, RouteProps as ReactDOMRouterProps, Redirect } from 'react-router-dom';
// import { Container } from './styles';

import { useAuth } from '../hooks/Authentication';

interface RouteProps extends ReactDOMRouterProps {
   isPrivate?:boolean;
   component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => (isPrivate === !!user ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: isPrivate ? '/' : '/dashboard',
          state: { from: location },
        }}
        />
      ))}
    />
  );
};

export default Route;
