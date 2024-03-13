// usePost.js
import { useState } from "react";

function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (url, data, isFormData = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: isFormData ? {} : { "Content-Type": "application/json" },
        body: isFormData ? data : JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setLoading(false);
      return responseData;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { postData, loading, error };
}

export default usePost;
