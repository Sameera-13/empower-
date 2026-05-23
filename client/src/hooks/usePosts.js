import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function usePosts(params = {}) {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: async () => {
      const { data } = await api.get('/posts', { params });
      return data;
    },
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data } = await api.get(`/posts/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const { data } = await api.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await api.put(`/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: ['posts'] });
      qc.invalidateQueries({ queryKey: ['post', id] });
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/posts/${id}`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useToggleLike() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.post(`/posts/${id}/like`);
      return data;
    },
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ['posts'] });
      qc.invalidateQueries({ queryKey: ['post', id] });
    },
  });
}

export function useReportPost() {
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.post(`/posts/${id}/report`);
      return data;
    },
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, text }) => {
      const { data } = await api.post(`/posts/${postId}/comments`, { text });
      return data;
    },
    onSuccess: (_, { postId }) => qc.invalidateQueries({ queryKey: ['post', postId] }),
  });
}

export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, commentId }) => {
      const { data } = await api.delete(`/posts/${postId}/comments/${commentId}`);
      return data;
    },
    onSuccess: (_, { postId }) => qc.invalidateQueries({ queryKey: ['post', postId] }),
  });
}
