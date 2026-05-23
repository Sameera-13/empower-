import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useAnalytics() {
  return useQuery({
    queryKey: ['admin', 'analytics'],
    queryFn: async () => {
      const { data } = await api.get('/admin/analytics');
      return data;
    },
  });
}

export function useReports(params = {}) {
  return useQuery({
    queryKey: ['admin', 'reports', params],
    queryFn: async () => {
      const { data } = await api.get('/admin/reports', { params });
      return data;
    },
  });
}

export function useResolveReport() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, action }) => {
      const { data } = await api.put(`/admin/reports/${id}/resolve`, { action });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'reports'] });
      qc.invalidateQueries({ queryKey: ['admin', 'analytics'] });
    },
  });
}

export function useAdminUsers(params = {}) {
  return useQuery({
    queryKey: ['admin', 'users', params],
    queryFn: async () => {
      const { data } = await api.get('/users', { params });
      return data;
    },
  });
}

export function useToggleBan() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.put(`/users/${id}/ban`);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/users/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin', 'users'] });
      qc.invalidateQueries({ queryKey: ['admin', 'analytics'] });
    },
  });
}
