import { useState } from 'react';

const useDelete = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteItem = async (itemId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/item/item/${itemId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('Item deleted successfully:', itemId);
      return true;
    } catch (error) {
      setError(error);
      console.error('Error deleting item:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteItem, isLoading, error };
};

export default useDelete;
