import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBookById } from '@/server/books'
import { toast } from 'sonner'

export function useDeleteBookById () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteBookById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] })
      toast.success('Book deleted successfully')
    },
    onError: error => {
      //   console.error('Error deleting product:', error)
      toast.error('Error deleting book')
    }
  })
}
