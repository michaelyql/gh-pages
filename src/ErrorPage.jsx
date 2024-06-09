import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div>
      Page not found
      <i>{error.statusText || error.message}</i>
    </div>
  );
};

export default ErrorPage;
