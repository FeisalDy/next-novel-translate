import { useMutation } from '@tanstack/react-query'
import { createChapter } from '@/server/chapters'
import { toast } from 'sonner'

export function useCreateChapter (bookId: string) {
  return useMutation<FormData, unknown, FormData>({
    mutationFn: FormData => createChapter(FormData),
    onSuccess: () => {
      toast('Chapters has been created.')
    },
    onError: error => {
      toast("Couldn't create chapters. Please try again.")
    }
  })
}
