'use client'
import { useState } from 'react'
import { CreateChapterDialog } from '@/app/dashboard/books/[bookId]/create-chapter-dialog'
import TranslateButton from '@/app/dashboard/books/[bookId]/translate-chapters-button'
import DeleteButton from '@/app/dashboard/books/[bookId]/delete-button'
import TranslateBookByIdButton from '@/app/dashboard/books/[bookId]/translate-book-button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { MoreHorizontal } from 'lucide-react'

type MenuDialogPropsT = {
  bookId: string
}

export default function MenuDialog ({ bookId }: MenuDialogPropsT) {
  const [menuDialogOpen, setMenuDialogOpen] = useState(false)

  return (
    <>
      <Dialog open={menuDialogOpen} onOpenChange={setMenuDialogOpen}>
        <DialogTrigger>
          <MoreHorizontal className='absolute top-4 right-4 h-6 w-6 cursor-pointer' />
        </DialogTrigger>
        <DialogContent className=''>
          <DialogHeader className='gap-y-1'>
            <DialogTitle>Book Menu</DialogTitle>
            <CreateChapterDialog
              bookId={bookId}
              setMenuDialogOpen={setMenuDialogOpen}
              //   className='sm:max-w-fit'
            />
            <TranslateBookByIdButton
              id={bookId}
              setMenuDialogOpen={setMenuDialogOpen}
              //   className='sm:max-w-fit'
            />
            <DeleteButton
              bookId={bookId}
              setMenuDialogOpen={setMenuDialogOpen}
              //   className='sm:max-w-fit'
            />
            {/* <TranslateButton
              bookId={bookId}
              setMenuDialogOpen={setMenuDialogOpen}
              className='sm:max-w-fit'
            /> */}
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
