import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { WorkRequest } from '@/lib/types';

export const useWorkRequests = () => {
  return useQuery({
    queryKey: ['work-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('work_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as WorkRequest[];
    },
  });
};

export const useCreateWorkRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (request: Omit<WorkRequest, 'id' | 'created_at' | 'status'>) => {
      const { data, error } = await supabase
        .from('work_requests')
        .insert({ ...request, status: 'pending' })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-requests'] });
    },
  });
};

export const useUpdateWorkRequestStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: WorkRequest['status'] }) => {
      const { data, error } = await supabase
        .from('work_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-requests'] });
    },
  });
};
