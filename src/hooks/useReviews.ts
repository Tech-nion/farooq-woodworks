import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Review } from '@/lib/types';

export const useReviews = (workerId: string) => {
  return useQuery({
    queryKey: ['reviews', workerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('worker_id', workerId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    },
    enabled: !!workerId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (review: Omit<Review, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('reviews')
        .insert(review)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', data.worker_id] });
      queryClient.invalidateQueries({ queryKey: ['worker', data.worker_id] });
    },
  });
};
