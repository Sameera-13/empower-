import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getAccessToken } from '../services/api';

export function useNotificationStream() {
  const qc = useQueryClient();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = getAccessToken();
    if (!token) return;

    const baseUrl = import.meta.env.VITE_API_URL || '/api';
    const url = `${baseUrl}/notifications/stream?token=${encodeURIComponent(token)}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = () => {
      qc.invalidateQueries({ queryKey: ['notifications'] });
    };

    eventSource.onerror = () => {
      // EventSource auto-reconnects, no action needed
    };

    return () => {
      eventSource.close();
    };
  }, [isAuthenticated, qc]);
}
