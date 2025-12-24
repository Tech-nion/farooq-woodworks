import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Worker } from '@/lib/types';

export const useWorkers = () => {
  return useQuery({
    queryKey: ['workers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data as Worker[];
    },
  });
};

export const useWorker = (id: string) => {
  return useQuery({
    queryKey: ['worker', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('workers')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Worker | null;
    },
    enabled: !!id,
  });
};

export const useCreateWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (worker: Omit<Worker, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('workers')
        .insert(worker)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
};

export const useUpdateWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Worker> & { id: string }) => {
      const { data, error } = await supabase
        .from('workers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
      queryClient.invalidateQueries({ queryKey: ['worker', data.id] });
    },
  });
};

export const useDeleteWorker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('workers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workers'] });
    },
  });
};
