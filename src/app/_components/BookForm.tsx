'use client'
import React from 'react'
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Cropper from 'react-easy-crop'
import { updateBookById, createBook } from '@/server/books'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

type BookFormProps = {
  mode: 'create' | 'edit'
  initialValues?: Partial<BookFormValues>
}

export type BookFormValues = {
  id?: number
  cover?: string | File | null
  file?: File
  title?: string
  author?: string
  description?: string
  wordCount?: string | number
  tags?: string
}

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
]

const formSchema = z.object({
  file: z
    .any()
    .optional()
    .refine(
      file => !file || file.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      file => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
  title: z.string().nonempty(),
  author: z.string().nonempty(),
  description: z.string().nonempty(),
  //   wordCount: z.string(), // Change to z.number()
  wordCount: z.union([z.string(), z.number()]), // Accept both string and number
  tags: z.string().optional()
})

async function getCroppedImg (
  imageSrc: string,
  croppedAreaPixels: any
): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        return reject(new Error('Could not get canvas context'))
      }

      canvas.width = croppedAreaPixels.width
      canvas.height = croppedAreaPixels.height

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      )

      canvas.toBlob(blob => {
        if (!blob) {
          return reject(new Error('Canvas is empty'))
        }
        const file = new File([blob], 'cropped-image.jpg', {
          type: 'image/jpeg'
        })
        resolve(file)
      }, 'image/jpeg')
    }
    image.onerror = () => reject(new Error('Image loading error'))
  })
}

const BookForm: React.FC<BookFormProps> = ({ mode, initialValues = {} }) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })
  const [zoom, setZoom] = React.useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<any>(null)
  const [imageSrc, setImageSrc] = React.useState<string | null>(
    (initialValues.cover as unknown as string) || null
  )

  const form = useForm<BookFormValues>({
    resolver: zodResolver(formSchema),
    // defaultValues: initialValues
    defaultValues: {
      id: initialValues.id || 0,
      cover: initialValues.cover || null,
      file: initialValues.file || undefined,
      title: initialValues.title || '',
      author: initialValues.author || '',
      description: initialValues.description || '',
      wordCount: initialValues.wordCount || '',
      tags: initialValues.tags || ''
    }
  })

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = event.target.files ? event.target.files[0] : null
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result as string)
        onChange(file)
      }
      reader.readAsDataURL(file)
    } else {
      setImageSrc(null)
      onChange(null)
    }
  }

  const handleSubmit = async (values: BookFormValues) => {
    const dataToSend: Partial<BookFormValues> = {}

    // Include only modified values
    Object.keys(values).forEach(key => {
      if (
        values[key as keyof BookFormValues] !==
        initialValues[key as keyof BookFormValues]
      ) {
        //@ts-ignore
        dataToSend[key as keyof BookFormValues] =
          values[key as keyof BookFormValues]
      }
    })

    // Add cropped image if applicable
    if (imageSrc && croppedAreaPixels && imageSrc !== initialValues.cover) {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels)
      //   dataToSend.file = croppedFile
      dataToSend.cover = croppedFile
      delete dataToSend.file
    }

    const formData = new FormData()
    Object.entries(dataToSend).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value) // Append file as form data
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString()) // Append other fields as strings
      }
    })

    // onSubmit(dataToSend)
    onSubmit(formData)
  }

  const handleClear = () => {
    // setImageSrc(initialValues.cover as string)
    setImageSrc('')
    // form.reset()
  }

  const onSubmit = async (formData: FormData) => {
    if (mode === 'edit' && initialValues.id) {
      server_updateBook({ formData, id: initialValues.id })
    } else {
      server_createBook(formData)
    }
  }

  const {
    data: res_createBook,
    mutate: server_createBook,
    isPending: createBookPending,
    isSuccess: createBookSuccess
  } = useMutation<FormData, unknown, FormData>({
    mutationFn: formData => createBook(formData),
    onSuccess: () => {
      toast('Book has been created.')
    },
    onError: error => {
      console.error('Error creating book:', error)
      toast("Couldn't create book. Please try again.")
    }
  })

  const {
    data: res_updateBook,
    mutate: server_updateBook,
    isPending: updateBookPending,
    isSuccess: updateBookSuccess
  } = useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: number }) =>
      updateBookById(id, formData),
    onSuccess: () => {
      toast('Book has been updated.')
    },
    onError: error => {
      console.error('Error updating book:', error)
      toast("Couldn't update book. Please try again.")
    }
  })

  if (updateBookSuccess || createBookSuccess) {
    redirect('/dashboard/books')
  }

  return (
    <div className='p-4 max-w-[600px] mx-auto'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='space-y-8 w-[320px] md:w-[550px]'
        >
          <FormField
            control={form.control}
            name='file'
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Cover</FormLabel>
                <FormControl>
                  {imageSrc ? (
                    <div className='space-y-1'>
                      <div className='relative w-full h-48 md:h-96'>
                        <Cropper
                          image={imageSrc}
                          crop={crop}
                          zoom={zoom}
                          aspect={3 / 4}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                      <Button
                        className='w-full'
                        onClick={handleClear}
                        variant='secondary'
                      >
                        Change Image?
                      </Button>
                    </div>
                  ) : (
                    <Input
                      type='file'
                      {...fieldProps}
                      accept='image/png, image/jpeg, image/jpg'
                      onChange={event => handleFileChange(event, onChange)}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder='Book title' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='author'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder='Author name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell about the book'
                    className='h-32'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='wordCount'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Word Count</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Word count'
                    type='number'
                    {...field}
                    onChange={e => field.onChange(e.target.value.toString())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder='Tags (comma separated)' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full'
            disabled={createBookPending || updateBookPending}
          >
            {mode === 'create' ? 'Create Book' : 'Update Book'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default BookForm
