import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await api.get('/testimonials');
      return data;
    },
    staleTime: 10 * 60 * 1000,
  });
}
