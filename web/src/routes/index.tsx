import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SiginIn from '../pages/SiginIn';
import SiginUp from '../pages/SiginUp';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SiginIn} exact />
    <Route path="/siginup" component={SiginUp} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
