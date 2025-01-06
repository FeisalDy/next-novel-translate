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
import { createChapter } from '@/server/chapters'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Dropzone, FileMosaic } from '@files-ui/react'
import { toast } from 'sonner'
import { useState } from 'react'

const formSchema = z.object({
  bookId: z.string(),
  file: z.any()
})

interface CreateChapterDialogProps {
  bookId: string
}

export function CreateChapterDialog ({ bookId }: CreateChapterDialogProps) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      bookId: bookId
    }
  })

  const {
    mutate: server_createChapters,
    isPending,
    isSuccess
  } = useMutation<FormData, unknown, FormData>({
    mutationFn: FormData => createChapter(FormData),
    onSuccess: () => {
      toast('Chapters has been created.')
      queryClient.invalidateQueries({ queryKey: ['book', bookId] })
    },
    onError: error => {
      toast("Couldn't create chapters. Please try again.")
    },
    onSettled: () => {
      setOpen(false)
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData()
      formData.append('bookId', bookId)
      formData.append('file', values.file)

      server_createChapters(formData)
      //   console.log(bookId)
      //   console.log(values.file)
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
            Anyone who has this link will be able to view this.
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
                      {/* <Input placeholder='Book title' {...field} /> */}
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
