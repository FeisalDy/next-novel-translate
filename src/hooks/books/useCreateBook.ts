import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBook } from '@/server/books'
import { toast } from 'sonner'

export function useCreateBook () {
  const queryClient = useQueryClient()

  return useMutation<FormData, unknown, FormData>({
    mutationFn: formData => createBook(formData),
    onSuccess: () => {
      toast('Book has been created.')
      queryClient.invalidateQueries({ queryKey: 'books' })
    },
    onError: error => {
      toast("Couldn't create book. Please try again.")
    }
  })
}
