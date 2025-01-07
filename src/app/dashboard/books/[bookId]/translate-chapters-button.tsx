'use client'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { langList } from '@/lib/lang-list'
import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import useTranslateChapterByBookId from '@/hooks/translate/useTranslateChapterByBookId'

export default function TranslateButton ({ bookId }: { bookId: string }) {
  const bookIdInt = parseInt(bookId)

  const [sourceLang, setSourceLang] = React.useState('zh-CN')
  const [targetLang, setTargetLang] = React.useState('en')
  const [sourceOpen, setSourceOpen] = React.useState(false)
  const [targetOpen, setTargetOpen] = React.useState(false)
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const {
    mutateAsync: server_translateBookChapters,
    // mutate: server_translateBookChapters,
    isPending,
    isSuccess
  } = useTranslateChapterByBookId()

  const handleTranslateChapters = async () => {
    if (!sourceLang || !targetLang) {
      toast.error('Please select both source and target languages.')
      return
    }

    if (sourceLang === targetLang) {
      toast.error('Source and target languages must be different.')
      return
    }

    try {
      await server_translateBookChapters({
        bookIdInt,
        source_lang: sourceLang,
        target_lang: targetLang
      })
      setDialogOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const langs = langList

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant='secondary' disabled={isPending}>
            Translate Chapters
          </Button>
        </DialogTrigger>
        <DialogContent className=''>
          <DialogHeader>
            <DialogTitle>Select Source and Target Languages</DialogTitle>
          </DialogHeader>
          <div className='flex flex-col space-y-4'>
            {/* Source Language Selector */}
            <Popover open={sourceOpen} onOpenChange={setSourceOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={sourceOpen}
                  className='justify-between'
                >
                  {sourceLang === 'zh-CN'
                    ? 'Chinese (Simplified)'
                    : sourceLang || 'Select Source Language'}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Search source language...' />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {langs.map(lang => (
                        <CommandItem
                          key={lang.label}
                          value={lang.label}
                          onSelect={currentLabel => {
                            setSourceLang(
                              currentLabel === sourceLang ? '' : currentLabel
                            )
                            setSourceOpen(false)
                          }}
                        >
                          {lang.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              sourceLang === lang.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Target Language Selector */}
            <Popover open={targetOpen} onOpenChange={setTargetOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={targetOpen}
                  className='justify-between'
                >
                  {targetLang === 'en'
                    ? 'English'
                    : targetLang || 'Select Target Language'}
                  <ChevronsUpDown className='opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-0'>
                <Command>
                  <CommandInput placeholder='Search target language...' />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {langs.map(lang => (
                        <CommandItem
                          key={lang.label}
                          value={lang.label}
                          onSelect={currentLabel => {
                            setTargetLang(
                              currentLabel === targetLang ? '' : currentLabel
                            )
                            setTargetOpen(false)
                          }}
                        >
                          {lang.label}
                          <Check
                            className={cn(
                              'ml-auto',
                              targetLang === lang.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Button onClick={handleTranslateChapters} disabled={isPending}>
              {isPending ? 'Translating...' : 'Translate Chapters'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
