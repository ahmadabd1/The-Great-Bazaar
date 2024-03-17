import { useState } from 'react';
import axios from 'axios';

const usePut = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const putData = async (url, data, config) => {
    try {
      setLoading(true);
      const response = await axios.put(url, data, config);
      setLoading(false);
      return response;  // Return the response object
    } catch (error) {
      setError(error);
      setLoading(false);
      return error.response;  // Return the error response
    }
  };

  return { loading, error, putData };
};

export default usePut;
