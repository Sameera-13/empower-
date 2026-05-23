import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (email) => {
      const { data } = await api.post('/newsletter', { email });
      return data;
    },
  });
}

export function useAdminSubscribers(params = {}) {
  return useQuery({
    queryKey: ['admin', 'subscribers', params],
    queryFn: async () => {
      const { data } = await api.get('/newsletter', { params });
      return data;
    },
  });
}

export function useDeleteSubscriber() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/newsletter/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'subscribers'] }),
  });
}
