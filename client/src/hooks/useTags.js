import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useTags() {
  return useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const { data } = await api.get('/tags');
      return data;
    },
  });
}

export function useCreateTag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, color }) => {
      const { data } = await api.post('/tags', { name, color });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tags'] }),
  });
}
