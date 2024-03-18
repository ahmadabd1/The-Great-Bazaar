import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'

const getUserData = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
      console.log('Access token not available.');
      return null;
  }

  try {
      const response = await fetch('http://localhost:8080/user/data', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`, 
          },
      });

      if (!response.ok) {
          throw new Error('Failed to fetch user data.');
      }

      const data = await response.json();
      return data; 
  } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
  }
};

const refreshAccessToken = async () => {
  const user = await getUserData(); 
  if (!user || !user.refreshToken) {
      console.log('Failed to retrieve user data or refresh token.');
      return false;
  }

  const refreshToken = user.refreshToken; 

  const response = await fetch('http://localhost:8080/refresh/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    console.log('Failed to refresh access token.');
    return false;
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.accessToken);
  return true;
};



const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const setupAccessTokenRefresh = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        setIsAuthenticated(false);
        return;
      }
  
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;
      const refreshBufferTime = -30; 
      const timeUntilExpiration = (decoded.exp - currentTime + refreshBufferTime) * 1000;
  
      console.log(`Attempting to refresh in ${timeUntilExpiration / 1000} seconds.`);
  
      setTimeout(async () => {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          console.log('Attempting to retry token refresh...');
          const retryRefreshed = await refreshAccessToken(); 
          if (!retryRefreshed) {
            setIsAuthenticated(false);
          } else {
            setupAccessTokenRefresh(); 
          }
        } else {
          setupAccessTokenRefresh(); 
        }
      }, timeUntilExpiration);
    };
  
    setupAccessTokenRefresh();
  }, []);
  

  
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return children;
};

export default ProtectedRoute;
