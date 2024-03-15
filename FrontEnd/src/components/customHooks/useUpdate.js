import { useState } from 'react';

const useUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const update = async (url, data) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);
    setIsSuccess(false);

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        body: data,
      })
      .then(response => {
        setResponse(response);
        if (!response.ok) {
          response.json().then(responseData => {
            setError(responseData.message || 'Failed to update item');
            reject(responseData.message);
          });
        } else {
          response.json().then(responseData => {
            setIsSuccess(true);
            resolve(responseData);
          });
        }
      })
      .catch(error => {
        setError(error.message);
        reject(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
    });
  };

  return { update, isLoading, error, response, isSuccess };
};

export default useUpdate;
