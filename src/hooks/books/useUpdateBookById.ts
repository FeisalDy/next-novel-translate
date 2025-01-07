import { useMutation } from '@tanstack/react-query'
import { updateBookById } from '@/server/books'
import { toast } from 'sonner'

export function useUpdateBookById () {
  return useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: number }) =>
      updateBookById(id, formData),
    onSuccess: () => {
      toast('Book has been updated.')
    },
    onError: error => {
      toast("Couldn't update book. Please try again.")
    }
  })
}
