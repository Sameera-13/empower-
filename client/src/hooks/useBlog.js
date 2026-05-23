import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useBlogPosts(params = {}) {
  return useQuery({
    queryKey: ['blog', params],
    queryFn: async () => {
      const { data } = await api.get('/blog', { params });
      return data;
    },
  });
}

export function useBlogPost(slug) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const { data } = await api.get(`/blog/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}

export function useAdminBlogPosts(params = {}) {
  return useQuery({
    queryKey: ['admin', 'blog', params],
    queryFn: async () => {
      const { data } = await api.get('/blog/admin', { params });
      return data;
    },
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog'] }),
  });
}

export function useUpdateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await api.put(`/blog/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog'] }),
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/blog/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog'] }),
  });
}
