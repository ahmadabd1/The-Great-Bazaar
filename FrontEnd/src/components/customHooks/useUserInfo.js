import { useState, useEffect } from 'react';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          setError("User email not found");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:8080/user/${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user information');
        }

        const userData = await response.json();
        setUserInfo(userData);
        console.log(userData)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []); 

  return { userInfo, loading, error };
};

export default useUserInfo;
