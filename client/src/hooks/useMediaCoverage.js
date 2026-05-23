import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useMediaCoverage() {
  return useQuery({
    queryKey: ['mediaCoverage'],
    queryFn: async () => {
      const { data } = await api.get('/media-coverage');
      return data;
    },
  });
}

export function useCreateMediaCoverage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/media-coverage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['mediaCoverage'] }),
  });
}

export function useUpdateMediaCoverage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await api.put(`/media-coverage/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['mediaCoverage'] }),
  });
}

export function useDeleteMediaCoverage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/media-coverage/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['mediaCoverage'] }),
  });
}
