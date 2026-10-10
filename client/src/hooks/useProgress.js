import { useState, useEffect, useCallback } from 'react';
import { calculateAnalytics } from '../utils/progress';

/**
 * Hook providing live computed analytics and progress data
 */
export function useProgress() {
  const [analytics, setAnalytics] = useState(calculateAnalytics);

  const refresh = useCallback(() => {
    setAnalytics(calculateAnalytics());
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      refresh();
    };

    window.addEventListener('storage', handleUpdate);
    window.addEventListener('interview_storage_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('interview_storage_updated', handleUpdate);
    };
  }, [refresh]);

  return {
    ...analytics,
    refresh
  };
}
