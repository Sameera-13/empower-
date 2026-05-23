import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useOpportunities(params = {}) {
  return useQuery({
    queryKey: ['opportunities', params],
    queryFn: async () => {
      const { data } = await api.get('/opportunities', { params });
      return data;
    },
  });
}

export function useOpportunity(id) {
  return useQuery({
    queryKey: ['opportunity', id],
    queryFn: async () => {
      const { data } = await api.get(`/opportunities/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await api.post('/opportunities', body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['opportunities'] }),
  });
}

export function useUpdateOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...body }) => {
      const { data } = await api.put(`/opportunities/${id}`, body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['opportunities'] }),
  });
}

export function useDeleteOpportunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/opportunities/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['opportunities'] }),
  });
}

export function useToggleSave() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.post(`/opportunities/${id}/save`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['opportunities'] });
      qc.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
