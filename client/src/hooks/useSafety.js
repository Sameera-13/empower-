import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export function useEmergencyNumbers() {
  return useQuery({
    queryKey: ['safety', 'emergency-numbers'],
    queryFn: async () => {
      const { data } = await api.get('/safety/emergency-numbers');
      return data;
    },
    staleTime: 30 * 60 * 1000,
  });
}

export function useSafetyTips() {
  return useQuery({
    queryKey: ['safety', 'tips'],
    queryFn: async () => {
      const { data } = await api.get('/safety/tips');
      return data;
    },
    staleTime: 30 * 60 * 1000,
  });
}

export function useNationalOrgs() {
  return useQuery({
    queryKey: ['safety', 'organizations'],
    queryFn: async () => {
      const { data } = await api.get('/safety/organizations');
      return data;
    },
    staleTime: 30 * 60 * 1000,
  });
}
