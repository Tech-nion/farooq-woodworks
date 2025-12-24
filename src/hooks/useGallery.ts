import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { GalleryItem } from '@/lib/types';

export const useGallery = (categoryId?: string) => {
  return useQuery({
    queryKey: ['gallery', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('gallery')
        .select(`
          *,
          category:categories(*)
        `)
        .order('created_at', { ascending: false });
      
      if (categoryId && categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as GalleryItem[];
    },
  });
};

export const useCreateGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (item: Omit<GalleryItem, 'id' | 'created_at' | 'category'>) => {
      const { data, error } = await supabase
        .from('gallery')
        .insert(item)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};

export const useDeleteGalleryItem = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
    },
  });
};
