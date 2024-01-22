import cn from 'clsx'
import type { NextraMDXContent } from 'nextra'
import { useMounted } from 'nextra/hooks'
import type { ReactElement, ReactNode } from 'react'
import { Breadcrumb, NavLinks, Sidebar, SkipNavContent } from '../components'
import { useConfig, useThemeConfig } from '../contexts'
import { renderComponent } from '../utils'

const classes = {
  toc: cn(
    'nextra-toc _order-last max-xl:_hidden _w-64 _shrink-0 print:_hidden'
  ),
  main: cn('_w-full _break-words')
}

function Body({ children }: { children: ReactNode }): ReactElement {
  const config = useConfig()
  const themeConfig = useThemeConfig()
  const mounted = useMounted()
  const {
    activeThemeContext: themeContext,
    activeType,
    activeIndex,
    flatDocsDirectories,
    activePath
  } = config.normalizePagesResult

  if (themeContext.layout === 'raw') {
    return <div className={classes.main}>{children}</div>
  }

  const date =
    themeContext.timestamp && themeConfig.gitTimestamp && config.timestamp
      ? new Date(config.timestamp)
      : null

  const gitTimestampEl =
    // Because a user's time zone may be different from the server page
    mounted && date ? (
      <div className="_mt-12 _mb-8 _block _text-xs _text-gray-500 ltr:_text-right rtl:_text-left dark:_text-gray-400">
        {renderComponent(themeConfig.gitTimestamp, { timestamp: date })}
      </div>
    ) : (
      <div className="_mt-16" />
    )

  const content = (
    <>
      {renderComponent(themeContext.topContent)}
      {children}
      {gitTimestampEl}
      {renderComponent(themeContext.bottomContent)}
      {activeType !== 'page' && themeContext.pagination && (
        <NavLinks
          flatDocsDirectories={flatDocsDirectories}
          currentIndex={activeIndex}
        />
      )}
    </>
  )

  const body = themeConfig.main?.({ children: content }) || content

  if (themeContext.layout === 'full') {
    return (
      <article
        className={cn(
          classes.main,
          'nextra-content _min-h-[calc(100vh-var(--nextra-navbar-height))] _pl-[max(env(safe-area-inset-left),1.5rem)] _pr-[max(env(safe-area-inset-right),1.5rem)]'
        )}
      >
        {body}
      </article>
    )
  }

  return (
    <article
      className={cn(
        classes.main,
        'nextra-content _flex _min-h-[calc(100vh-var(--nextra-navbar-height))] _min-w-0 _justify-center _pb-8 _pr-[calc(env(safe-area-inset-right)-1.5rem)]',
        themeContext.typesetting === 'article' &&
          'nextra-body-typesetting-article'
      )}
    >
      <main className="_w-full _min-w-0 _max-w-6xl _px-6 _pt-4 md:_px-12">
        {activeType !== 'page' && themeContext.breadcrumb && (
          <Breadcrumb activePath={activePath} />
        )}
        {body}
      </main>
    </article>
  )
}

export const Wrapper: NextraMDXContent = ({ toc, children }) => {
  const config = useConfig()
  const themeConfig = useThemeConfig()
  const {
    activeType,
    activeThemeContext: themeContext,
    docsDirectories,
    directories
  } = config.normalizePagesResult

  const tocEl =
    activeType === 'page' ||
    !themeContext.toc ||
    themeContext.layout !== 'default' ? (
      themeContext.layout !== 'full' &&
      themeContext.layout !== 'raw' && (
        <nav className={classes.toc} aria-label="table of contents" />
      )
    ) : (
      <nav className={cn(classes.toc, '_px-4')} aria-label="table of contents">
        {renderComponent(themeConfig.toc.component, {
          toc: themeConfig.toc.float ? toc : [],
          filePath: config.filePath
        })}
      </nav>
    )
  return (
    <div
      className={cn(
        '_mx-auto _flex',
        themeContext.layout !== 'raw' && '_max-w-[90rem]'
      )}
    >
      <Sidebar
        docsDirectories={docsDirectories}
        fullDirectories={directories}
        toc={toc}
        asPopover={config.hideSidebar}
        includePlaceholder={themeContext.layout === 'default'}
      />
      {tocEl}
      <SkipNavContent />
      <Body>{children}</Body>
    </div>
  )
}
