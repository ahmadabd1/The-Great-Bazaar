// import { useState } from 'react';

// function usePost() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const postData = async (url, data, sendEmail = false) => {
//     setLoading(true);
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const responseData = await response.json();
//       setLoading(false);
  
//       // Send email if specified
//       if (sendEmail) {
//         await sendRegistrationEmail(data.email); // Assuming you have a function to send registration email
//       }
  
//       return responseData;
//     } catch (error) {
//       setLoading(false);
//       setError(error);
//       throw error;
//     }
//   };
  

//   return { postData, loading, error };
// }

// export default usePost;
import { useState } from 'react';

function usePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const postData = async (url, data) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      setLoading(false);
  
      return responseData;
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error occurred');
      throw error;
    }
  };
  
  return { postData, loading, error };
}

export default usePost;

