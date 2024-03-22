import { useState } from 'react';

const useDeleteIncludeBody = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendDeleteRequest = async (url, options = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify(options.body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendDeleteRequest, isLoading, error };
};

export default useDeleteIncludeBody;
