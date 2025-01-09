/**
 * v0 by Vercel.
 * @see https://v0.dev/t/iEOJ3UhOd4C
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client'
import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import SearchComponent from '@/components/navbar/search'
import { usePathname } from 'next/navigation'

const NavigationMenuItems = [
  { name: 'Home', href: '/' },
  { name: 'Books', href: '/books' },
  { name: 'Placeholder', href: '#' },
  { name: 'Placeholder', href: '#' }
]

export default function NavBarComponent () {
  const pathname = usePathname()

  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6 justify-between'>
      {/* Mobile view */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='lg:hidden'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <VisuallyHidden.Root>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden.Root>

          <Link href='#' prefetch={false}>
            <MountainIcon className='h-6 w-6' />
            <span className='sr-only'>Acme Inc</span>
          </Link>
          <div className='grid gap-2 py-6'>
            {NavigationMenuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className='flex w-full items-center py-2 text-lg font-semibold'
                prefetch={false}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Dekstop view */}
      <div className='flex items-center'>
        <Link href='#' className='mr-6 hidden lg:flex' prefetch={false}>
          <MountainIcon className='h-6 w-6' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        <NavigationMenu className='hidden lg:flex'>
          <NavigationMenuList>
            {NavigationMenuItems.map((item, index) => (
              <NavigationMenuLink asChild key={index}>
                <Link
                  href={item.href}
                  key={index}
                  className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50'
                  prefetch={false}
                >
                  {item.name}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {pathname !== '/books/search' && (
        <SearchComponent className='max-w-[300px]' />
      )}
    </header>
  )
}

function MenuIcon (props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

function MountainIcon (props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  )
}
