import React, { Suspense } from 'react';
import { LinearProgress } from "@material-ui/core";
import { Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

const Routes = () => {  
  return (
    <Suspense fallback={<LinearProgress />}>
      <Route path="/" name="PublicRoutes" component={PublicRoutes}/>
    </Suspense>
  );
};

export default Routes;