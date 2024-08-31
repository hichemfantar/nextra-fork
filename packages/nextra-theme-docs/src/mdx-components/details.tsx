'use client'

import cn from 'clsx'
import type { ComponentProps, ReactElement, ReactNode } from 'react'
import { Children, cloneElement, useEffect, useMemo, useState } from 'react'
import { Collapse } from '../components'

function Details({
  children,
  open,
  className,
  ...props
}: ComponentProps<'details'>): ReactElement {
  const [isOpen, setIsOpen] = useState(!!open)
  // To animate the close animation we have to delay the DOM node state here.
  const [delayedOpenState, setDelayedOpenState] = useState(isOpen)

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => setDelayedOpenState(isOpen), 500)
      return () => clearTimeout(timeout)
    }
    setDelayedOpenState(true)
  }, [isOpen])

  const [summaryElement, restChildren] = useMemo(
    function findSummary(list = children): [summary: ReactNode, ReactNode] {
      let summary: ReactNode

      const rest = Children.map(list, child => {
        if (
          !summary && // Add onClick only for first summary
          child &&
          typeof child === 'object' &&
          'type' in child
        ) {
          if (child.type === 'summary') {
            summary = cloneElement(child, {
              onClick(event: MouseEvent) {
                event.preventDefault()
                setIsOpen(v => !v)
              }
            })
            return
          }
          if (child.type !== Details && child.props.children) {
            ;[summary, child] = findSummary(child.props.children)
          }
        }
        return child
      })

      return [summary, rest]
    },
    [children]
  )

  return (
    <details
      className={cn(
        '[&:not(:first-child)]:_mt-4 _rounded _border _border-gray-200 _bg-white _p-2 _shadow-sm dark:_border-neutral-800 dark:_bg-neutral-900',
        className
      )}
      {...props}
      open={delayedOpenState}
      data-expanded={isOpen ? '' : undefined}
    >
      {summaryElement}
      <Collapse isOpen={isOpen}>{restChildren}</Collapse>
    </details>
  )
}
