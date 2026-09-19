import { createBrowserRouter, Navigate } from 'react-router-dom';
import Root from './root';
import ErrorPage from './error-page';
import { routes, loginRoute } from './routes';
import { User } from '../types';

const children = routes.map(({ key, element }) => ({
  path: `/${key}`,
  element,
}));

export const getRouter = (user: User | null) => {
  return createBrowserRouter(
    user
      ? [
          {
            path: '/',
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <Navigate replace to={children[0].path} />,
              },
              ...children,
            ],
          },
        ]
      : [
          {
            path: '/',
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <Navigate replace to={loginRoute.path} />,
              },
              loginRoute,
            ],
          },
        ]
  );
};
