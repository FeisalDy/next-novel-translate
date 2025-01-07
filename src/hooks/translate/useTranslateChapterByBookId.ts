import { useMutation } from '@tanstack/react-query'
import { translateBookChaptersByBookId } from '@/server/translate'
import { toast } from 'sonner'

export default function useTranslateChapterByBookId () {
  return useMutation({
    mutationFn: ({
      bookIdInt,
      source_lang,
      target_lang
    }: {
      bookIdInt: number
      source_lang: string
      target_lang: string
    }) => translateBookChaptersByBookId(bookIdInt, source_lang, target_lang),
    onSuccess: () => {
      toast.success('Chapters translated successfully')
    },
    onError: error => {
      toast.error('Error translating chapters')
    }
  })
}
