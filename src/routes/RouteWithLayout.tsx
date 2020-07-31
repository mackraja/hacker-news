import React from 'react';
import { Route } from 'react-router-dom';

interface RouteWithLayoutProps {
  exact?: boolean,
  component: any,
  layout: any,
  path: string
}

const RouteWithLayout = (props: RouteWithLayoutProps) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
