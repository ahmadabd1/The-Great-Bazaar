import { useState, useEffect } from 'react';
import useGet from './useGet';

const useGetStatistics = () => {
  const { data: itemData, loading: itemLoading, error: itemError } = useGet('http://localhost:8080/statics/item');
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useGet('http://localhost:8080/statics/category');
  const { data: monthlyIncomeData, loading: monthlyIncomeLoading, error: monthlyIncomeError } = useGet('http://localhost:8080/statics/monthlyIncome');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(itemLoading || categoryLoading || monthlyIncomeLoading);
    setError(itemError || categoryError || monthlyIncomeError);
  }, [itemLoading, categoryLoading, monthlyIncomeLoading, itemError, categoryError, monthlyIncomeError]);

  return { itemData, categoryData, monthlyIncomeData, loading, error };
};

export default useGetStatistics;
