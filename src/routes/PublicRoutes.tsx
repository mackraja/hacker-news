import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import RouteWithLayout from './RouteWithLayout'
import { Main as MainLayout } from '../layouts';

const PublicRoutes = () => {
  return (
    <Switch>        
        <RouteWithLayout
            component={lazy(() => import("../views/Dashboard"))}
            exact
            layout={MainLayout}
            path="/"
        />
        <RouteWithLayout
            component={lazy(() => import("../views/Dashboard"))}
            exact
            layout={MainLayout}
            path="/dashboard"
        />        
    </Switch>
  )
};

export default PublicRoutes;
