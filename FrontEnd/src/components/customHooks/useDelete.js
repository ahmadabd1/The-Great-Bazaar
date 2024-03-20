import { useState } from 'react';

const useDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (route, id) => {
    console.log(`${route}/${id}`);
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${route}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Item deleted successfully');
    } catch (error) {
      setError(error);
      console.error('Error deleting item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteItem, isLoading, error };
};

export default useDelete;