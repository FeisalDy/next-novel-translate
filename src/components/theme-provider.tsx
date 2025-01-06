// 'use client'

// import * as React from 'react'
// import { ThemeProvider as NextThemesProvider } from 'next-themes'

// export function ThemeProvider ({
//   children,
//   ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//   const [mounted, setMounted] = React.useState(false)
//   React.useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) {
//     return <>{children}</>
//   }

//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
// }

'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>

export function ThemeProvider ({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    // Cleanup function to remove theme classes
    return () => {
      document.documentElement.classList.remove(
        'light',
        'dark',
        'theme-default',
        'theme-orange',
        'theme-rose',
        'theme-blue',
        'theme-green',
        'theme-purpleish',
        'theme-cyanish',
        'theme-yellowish',
        'theme-maronish',
        'theme-new'
      )
    }
  }, [])

  // Prevent rendering until mounted for server-side hydration mismatch
  if (!mounted) {
    return null
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
