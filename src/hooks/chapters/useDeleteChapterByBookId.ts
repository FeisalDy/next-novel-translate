import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteChaptersByBookId } from '@/server/chapters'
import { toast } from 'sonner'

export function useDeleteChaptersByBookId (bookId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (bookId: string) => deleteChaptersByBookId(bookId),
    onSuccess: () => {
      toast('Chapters has been deleted.')
      queryClient.invalidateQueries({ queryKey: ['book', bookId] })
    },
    onError: () => {
      toast('Failed to delete chapters.')
    }
  })
}
