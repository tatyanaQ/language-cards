import { createBrowserRouter, Navigate } from 'react-router-dom'
import Root from './root'
import ErrorPage from './error-page'
import { routes } from './routes'

const children = routes.map(({ key, element }) => ({
  path: `/${key}`,
  element,
}))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate replace to={children[0].path} /> },
      ...children,
    ],
  },
])
