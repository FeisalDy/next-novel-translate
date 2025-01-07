'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Dropzone, FileMosaic } from '@files-ui/react'
import { useState } from 'react'
import { useCreateChapter } from '@/hooks/chapters/useCreateChapter'

const formSchema = z.object({
  bookId: z.string(),
  file: z.any()
})

interface CreateChapterDialogProps {
  bookId: string
}

export function CreateChapterDialog ({ bookId }: CreateChapterDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      bookId: bookId
    }
  })

  const {
    mutateAsync: server_createChapters,
    isPending,
    isSuccess
  } = useCreateChapter(bookId)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData()
      formData.append('bookId', bookId)
      formData.append('file', values.file)

      await server_createChapters(formData)
      setOpen(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const updateFile = (incomingFiles: { file: File | undefined }[]) => {
    const validFiles = incomingFiles.filter(f => f.file !== undefined) as {
      file: File
    }[]
    if (validFiles.length > 0) {
      const latestFile = validFiles[validFiles.length - 1].file
      form.setValue('file', latestFile, { shouldValidate: true })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Chapters</Button>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Create new chapters</DialogTitle>
          <DialogDescription>
            Make sure the file follow the txt format here.
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 w-full'
            >
              <FormField
                control={form.control}
                name='file'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Dropzone
                        onChange={files =>
                          updateFile(
                            files.map(f => ({
                              file: f.file
                            }))
                          )
                        }
                        accept='.txt'
                      >
                        {field.value && (
                          <FileMosaic
                            file={field.value}
                            info
                            onDelete={() => form.setValue('file', undefined)}
                          />
                        )}
                      </Dropzone>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full' disabled={isPending}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
        <DialogFooter className='sm:justify-start'>
          <DialogClose asChild>
            <Button type='button' variant='secondary' className='w-full'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
