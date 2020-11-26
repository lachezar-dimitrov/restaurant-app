import { useState, useEffect } from 'react';

export default ({ interceptors }) => {
  const [error, setError] = useState(null);

  const requestInterceptor = interceptors.request.use((request) => {
    setError(null);

    return request;
  });

  const responseInterceptor = interceptors.response.use(
    (response) => response,

    (error) => setError(error)
  );

  useEffect(
    () => () => {
      interceptors.request.eject(requestInterceptor);

      interceptors.response.eject(responseInterceptor);
    },
    [requestInterceptor, responseInterceptor, interceptors.request, interceptors.response]
  );

  const errorConfirmedHandler = () => setError(null);

  return [error, errorConfirmedHandler];
};
