import React from 'react';

import { useAuth } from '../hooks/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { user } = useAuth();

  // console.log('routes/index.tsx:34', user);
  // return <AuthRoutes />;
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
