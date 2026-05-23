import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await api.post('/contact', body);
      return data;
    },
  });
}

export function useAdminMessages(params = {}) {
  return useQuery({
    queryKey: ['admin', 'messages', params],
    queryFn: async () => {
      const { data } = await api.get('/contact', { params });
      return data;
    },
  });
}

export function useMarkMessageRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.put(`/contact/${id}/read`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'messages'] }),
  });
}

export function useDeleteMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/contact/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'messages'] }),
  });
}
