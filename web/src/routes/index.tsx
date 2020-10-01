import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SiginIn from '../pages/SiginIn';
import SiginUp from '../pages/SiginUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" component={SiginIn} exact />
    <Route path="/siginup" component={SiginUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
