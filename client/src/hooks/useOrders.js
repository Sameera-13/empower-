import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await api.post('/orders/create', body);
      return data;
    },
  });
}

export function useVerifyPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body) => {
      const { data } = await api.post('/orders/verify', body);
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['orders'] }),
  });
}

export function useMyOrders(params = {}) {
  return useQuery({
    queryKey: ['orders', 'my', params],
    queryFn: async () => {
      const { data } = await api.get('/orders/my', { params });
      return data;
    },
  });
}

export function useAdminOrders(params = {}) {
  return useQuery({
    queryKey: ['admin', 'orders', params],
    queryFn: async () => {
      const { data } = await api.get('/orders', { params });
      return data;
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await api.put(`/orders/${id}/status`, { status });
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin', 'orders'] }),
  });
}
