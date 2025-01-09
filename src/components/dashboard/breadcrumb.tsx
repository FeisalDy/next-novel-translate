'use client'
import * as React from 'react'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

export default function BreadCrumbComponent () {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/')
          const isLast = index === pathSegments.length - 1

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem key={href}>
                {isLast ? (
                  <span>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </span>
                ) : (
                  <BreadcrumbLink href={href} key={href}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <span
                  key={`${href}-separator`}
                  role='presentation'
                  aria-hidden='true'
                  className='[&>svg]:w-3.5 [&>svg]:h-3.5'
                >
                  <BreadcrumbSeparator />
                </span>
              )}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
