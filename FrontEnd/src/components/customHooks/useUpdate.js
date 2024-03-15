import { useState } from 'react';

const useUpdate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const update = async (url, data) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        body: data,
      });
      const responseData = await response.json();
      setResponse(responseData);
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update item');
      }
      setIsSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return { update, isLoading, error, response, isSuccess };
};

export default useUpdate;
