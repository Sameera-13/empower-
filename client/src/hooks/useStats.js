import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const { data } = await api.get('/stats');
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
}
