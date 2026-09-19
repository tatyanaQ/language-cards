import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { getRouter } from './routes/router';
import { useUser } from './providers/user';
import { checkAuth } from './api';

export const App: React.FC = () => {
  const { user, setUser } = useUser();
  const [userChecked, setUserChecked] = useState(false);

  const checkUser = async () => {
    const user = await checkAuth();
    if (user) setUser(user);
    setUserChecked(true);
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (!userChecked) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={getRouter(user)} />;
};
