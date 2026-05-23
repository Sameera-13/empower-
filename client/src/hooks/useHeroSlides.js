import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useHeroSlides() {
  return useQuery({
    queryKey: ['heroSlides'],
    queryFn: async () => {
      const { data } = await api.get('/hero-slides');
      return data;
    },
  });
}

export function useAdminHeroSlides() {
  return useQuery({
    queryKey: ['admin', 'heroSlides'],
    queryFn: async () => {
      const { data } = await api.get('/hero-slides/admin');
      return data;
    },
  });
}

export function useCreateHeroSlide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/hero-slides', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['heroSlides'] }),
  });
}

export function useUpdateHeroSlide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await api.put(`/hero-slides/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['heroSlides'] }),
  });
}

export function useDeleteHeroSlide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/hero-slides/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['heroSlides'] }),
  });
}
