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
  FormDescription,
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
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Link } from 'lucide-react'

const formSchema = z.object({
  bookId: z.string(),
  regex: z.string(),
  file: z.any()
})

interface CreateChapterDialogProps {
  bookId: string
  className?: string
  setMenuDialogOpen: (value: boolean) => void
}

export function CreateChapterDialog ({
  bookId,
  className,
  setMenuDialogOpen
}: CreateChapterDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      //   regex: '/第[一二三四五六七八九十百千零\d]+章/',
      regex: '/第[一二三四五六七八九十百千零\\d]+章/', // Properly escaped double backslash
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
      formData.append('regex', values.regex)
      formData.append('file', values.file)

      await server_createChapters(formData)

      //   for (var pair of formData.entries()) {
      //     console.log(pair[0] + ', ' + pair[1])
      //   }
      setOpen(false)
      setMenuDialogOpen(false)
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
        <Button className={cn('', className)}>Create Chapters</Button>
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
                name='regex'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regex</FormLabel>
                    <FormControl>
                      <Input placeholder='Regex' {...field} />
                    </FormControl>
                    <FormDescription>
                      The regex to match the chapter title. Example of regex can
                      be found{' '}
                      <a
                        className="text-sky-400 font-bold after:content-['_↗'] ..."
                        href='/regex-example'
                        target='_blank'
                      >
                        Here
                      </a>
                      . If chapter not inputed correctly, check your regex
                      again.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
