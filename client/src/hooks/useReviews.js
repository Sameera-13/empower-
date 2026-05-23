import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export function useReviews(productId, params = {}) {
  return useQuery({
    queryKey: ['reviews', productId, params],
    queryFn: async () => {
      const { data } = await api.get(`/products/${productId}/reviews`, { params });
      return data;
    },
    enabled: !!productId,
  });
}

export function useCreateReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ productId, rating, text }) => {
      const { data } = await api.post(`/products/${productId}/reviews`, { rating, text });
      return data;
    },
    onSuccess: (data, variables) => {
      qc.invalidateQueries({ queryKey: ['reviews', variables.productId] });
      qc.invalidateQueries({ queryKey: ['product', variables.productId] });
    },
  });
}

export function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/reviews/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews'] });
      qc.invalidateQueries({ queryKey: ['product'] });
    },
  });
}
