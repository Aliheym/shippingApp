import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const redirectPoint = '/cart';

const ProtectedRoute = ({ isAllowed, ...rest }) =>
  isAllowed ? <Route {...rest} /> : <Redirect to={redirectPoint} />;

export default ProtectedRoute;
