import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useResources(params = {}) {
  return useQuery({
    queryKey: ['resources', params],
    queryFn: async () => {
      const { data } = await api.get('/resources', { params });
      return data;
    },
  });
}

export function useResource(id) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: async () => {
      const { data } = await api.get(`/resources/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateResource() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await api.post('/resources', body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['resources'] }),
  });
}

export function useUpdateResource() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...body }) => {
      const { data } = await api.put(`/resources/${id}`, body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['resources'] }),
  });
}

export function useDeleteResource() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/resources/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['resources'] }),
  });
}
