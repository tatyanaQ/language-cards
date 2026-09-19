import { useRouteError, Navigate } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as any;

  console.error(error);

  if (error.status === 404) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
