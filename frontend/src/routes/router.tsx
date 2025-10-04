import { createBrowserRouter } from 'react-router-dom'
import Root from './root'
import ErrorPage from './error-page'
import { routes } from './routes'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: routes.map(({ key, element }) => ({ path: `/${key}`, element })),
  },
])
