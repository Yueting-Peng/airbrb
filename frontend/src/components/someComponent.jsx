
import React, { useEffect } from 'react';
import useHttp from '../utils/useHttp';

const SomeComponent = () => {
  const { isLoading, error, data, request } = useHttp();

  useEffect(() => {
    request('get', '/your-endpoint');
  }, [request]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default SomeComponent;
