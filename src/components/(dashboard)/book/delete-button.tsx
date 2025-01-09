'use client'
import { Button } from '@/components/ui/button'
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
import { useDeleteChaptersByBookId } from '@/hooks/chapters/useDeleteChapterByBookId'
import { cn } from '@/lib/utils'

type DeleteButtonPropsT = {
  bookId: string
  className?: string
  setMenuDialogOpen: (open: boolean) => void
}
export default function DeleteButton ({
  bookId,
  className,
  setMenuDialogOpen
}: DeleteButtonPropsT) {
  const {
    mutate: server_DeleteChapters,
    isPending,
    isSuccess
  } = useDeleteChaptersByBookId(bookId)

  const handleDeleteChaptersButton = async () => {
    server_DeleteChapters(bookId)
    setMenuDialogOpen(false)
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' className={cn('', className)}>
            Delete Chapters
          </Button>
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
