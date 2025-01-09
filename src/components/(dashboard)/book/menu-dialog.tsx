'use client'
import { useState } from 'react'
import { CreateChapterDialog } from '@/components/(dashboard)/book/create-chapter-dialog'
import DeleteButton from '@/components/(dashboard)/book/delete-button'
import TranslateBookByIdButton from '@/components/(dashboard)/book/translate-book-button'
import {
  Dialog,
  DialogContent,
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
            />
            <TranslateBookByIdButton
              id={bookId}
              setMenuDialogOpen={setMenuDialogOpen}
            />
            <DeleteButton
              bookId={bookId}
              setMenuDialogOpen={setMenuDialogOpen}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}
