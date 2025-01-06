'use client'

import { Button } from '@/components/ui/button'
import { deleteChaptersByBookId } from '@/server/chapters'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

export default function DeleteButton ({ bookId }: { bookId: string }) {
  const queryClient = useQueryClient()

  const {
    mutate: server_DeleteChapters,
    isPending,
    isSuccess
  } = useMutation({
    mutationFn: (bookId: string) => deleteChaptersByBookId(bookId),
    onSuccess: () => {
      toast('Chapters has been deleted.')
      queryClient.invalidateQueries({ queryKey: ['book', bookId] })
    },
    onError: () => {
      toast('Failed to delete chapters.')
    }
  })

  const handleDeleteChaptersButton = async () => {
    server_DeleteChapters(bookId)
  }

  return (
    <>
      {/* <Button onClick={handleDeleteChaptersButton}>Delete Chapters</Button> */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive'>Delete Chapters</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              chapters from servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteChaptersButton}
              variant='destructive'
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
