import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function usePartners() {
  return useQuery({
    queryKey: ['partners'],
    queryFn: async () => {
      const { data } = await api.get('/partners');
      return data;
    },
  });
}

export function useAdminPartners() {
  return useQuery({
    queryKey: ['admin', 'partners'],
    queryFn: async () => {
      const { data } = await api.get('/partners/admin');
      return data;
    },
  });
}

export function useCreatePartner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/partners', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['partners'] }),
  });
}

export function useUpdatePartner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await api.put(`/partners/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['partners'] }),
  });
}

export function useDeletePartner() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/partners/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['partners'] }),
  });
}
