import cn from 'clsx'
import { Anchor } from 'nextra/components'

export const Link: typeof Anchor = ({ className, ...props }) => (
  <Anchor
    className={cn(
      '_text-primary-600 _underline hover:_no-underline _decoration-from-font [text-underline-position:from-font]',
      className
    )}
    {...props}
  />
)
