import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { HoldBookingRequest, HoldBookingResponse, VerifyPaymentRequest, VerifyPaymentResponse } from '../../types/api';

const API_BASE = '/api';

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await (window as any).Clerk?.session?.getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || error.error || 'Request failed');
  }

  return response.json();
}

export function useCreateBookingHold() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: HoldBookingRequest): Promise<HoldBookingResponse> => {
      return fetchWithAuth(`${API_BASE}/bookings/hold`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['availability'] });
    },
  });
}

export function useVerifyPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: VerifyPaymentRequest): Promise<VerifyPaymentResponse> => {
      return fetchWithAuth(`${API_BASE}/payments/verify`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['availability'] });
    },
  });
}

export function useUserBookings() {
  return useQuery({
    queryKey: ['bookings', 'user'],
    queryFn: async () => {
      return fetchWithAuth(`${API_BASE}/bookings/user`);
    },
  });
}

export function useCourtAvailability(date: string, courtId?: string) {
  return useQuery({
    queryKey: ['availability', date, courtId],
    queryFn: async () => {
      const params = new URLSearchParams({ date });
      if (courtId) params.append('courtId', courtId);
      
      const response = await fetch(`${API_BASE}/courts/availability?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }
      return response.json();
    },
    enabled: !!date,
  });
}

