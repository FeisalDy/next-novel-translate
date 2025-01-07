import { useMutation } from '@tanstack/react-query'
import { translateBookById } from '@/server/translate'
import { toast } from 'sonner'

export default function useTranslateBookById () {
  return useMutation({
    mutationFn: ({
      idInt,
      source_lang,
      target_lang
    }: {
      idInt: number
      source_lang: string
      target_lang: string
    }) => translateBookById(idInt, source_lang, target_lang),
    onSuccess: () => {
      toast.success('Book translated successfully')
    },
    onError: error => {
      toast.error('Error translating Book')
    }
  })
}
