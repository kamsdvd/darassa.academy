import { useState, useEffect } from 'react';
import { cachedAxios } from '../services/cacheService';
import { Formation } from '../types/formation';

interface UseFormationsResult {
  formations: Formation[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useFormations = (category?: string): UseFormationsResult => {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFormations = async () => {
    try {
      setLoading(true);
      const url = category 
        ? `/api/formations?category=${category}`
        : '/api/formations';
      
      const data = await cachedAxios.get<Formation[]>(url);
      setFormations(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormations();
  }, [category]);

  return {
    formations,
    loading,
    error,
    refetch: fetchFormations
  };
}; 