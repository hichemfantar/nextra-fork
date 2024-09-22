'use client'

import {
  MenuItem as _MenuItem,
  Menu,
  MenuButton,
  MenuItems
} from '@headlessui/react'
import cn from 'clsx'
import { Button } from 'nextra/components'
import { useFSRoute } from 'nextra/hooks'
import { ArrowRightIcon, MenuIcon } from 'nextra/icons'
import type { MenuItem, PageItem } from 'nextra/normalize-pages'
import type { ReactElement, ReactNode } from 'react'
import {
  useConfig,
  useMenu,
  useMenuActions,
  useThemeConfig
} from '../../stores'
import { Anchor } from '../anchor'

const classes = {
  link: cn(
    '_text-sm contrast-more:_text-gray-700 contrast-more:dark:_text-gray-100'
  ),
  active: cn('_font-medium _subpixel-antialiased'),
  inactive: cn(
    '_text-gray-600 hover:_text-gray-800 dark:_text-gray-400 dark:hover:_text-gray-200'
  )
}

function NavbarMenu({
  menu,
  children
}: {
  menu: MenuItem
  children: ReactNode
}): ReactElement {
  const { items } = menu
  const routes = Object.fromEntries(
    (menu.children || []).map(route => [route.name, route])
  )
  const entries =
    items instanceof Map
      ? Array.from(items.entries())
      : Object.entries(items || {})

  return (
    <Menu>
      <MenuButton
        className={({ focus }) =>
          cn(
            classes.link,
            classes.inactive,
            'max-md:_hidden _items-center _whitespace-nowrap _rounded _flex _gap-1.5',
            focus && 'nextra-focusable'
          )
        }
      >
        {children}
      </MenuButton>
      <MenuItems
        transition
        className={({ open }) =>
          cn(
            'motion-reduce:_transition-none',
            'nextra-focus',
            open ? '_opacity-100' : '_opacity-0',
            'nextra-scrollbar _transition-opacity',
            '_border _border-black/5 dark:_border-white/20',
            '_backdrop-blur-lg _bg-[rgb(var(--nextra-bg),.8)]',
            '_z-20 _rounded-md _py-1 _text-sm _shadow-lg',
            // headlessui adds max-height as style, use !important to override
            '!_max-h-[min(calc(100vh-5rem),256px)]'
          )
        }
        anchor={{ to: 'top end', gap: 10, padding: 16 }}
      >
        {entries.map(([key, item]) => (
          <_MenuItem
            key={key}
            as={Anchor}
            href={item.href || routes[key]?.route || menu.route + '/' + key}
            className={({ focus }) =>
              cn(
                '_block',
                '_py-1.5 _transition-colors _ps-3 _pe-9',
                focus
                  ? '_text-gray-900 dark:_text-gray-100'
                  : '_text-gray-600 dark:_text-gray-400'
              )
            }
            newWindow={item.newWindow}
          >
            {item.title || key}
          </_MenuItem>
        ))}
      </MenuItems>
    </Menu>
  )
}

export type NavbarProps = {
  children?: ReactNode
  project?: ReactNode
  chat?: ReactNode
}

export function ClientNavbar({
  children,
  project,
  chat
}: NavbarProps): ReactElement {
  const items = useConfig().normalizePagesResult.topLevelNavbarItems
  const themeConfig = useThemeConfig()

  const activeRoute = useFSRoute()
  const menu = useMenu()
  const { setMenu } = useMenuActions()

  return (
    <>
      {items.map(pageOrMenu => {
        if (pageOrMenu.display === 'hidden') return null

        if (pageOrMenu.type === 'menu') {
          const menu = pageOrMenu as MenuItem
          return (
            <NavbarMenu key={menu.title} menu={menu}>
              {menu.title}
              <ArrowRightIcon className="_h-3.5 *:_origin-center *:_transition-transform *:_rotate-90" />
            </NavbarMenu>
          )
        }
        const page = pageOrMenu as PageItem
        let href = page.href || page.route || '#'

        // If it's a directory
        if (page.children) {
          href =
            (page.withIndexPage ? page.route : page.firstChildRoute) || href
        }

        const isActive =
          page.route === activeRoute || activeRoute.startsWith(page.route + '/')

        return (
          <Anchor
            href={href}
            key={href}
            className={cn(
              classes.link,
              'max-md:_hidden _whitespace-nowrap',
              !isActive || page.newWindow ? classes.inactive : classes.active
            )}
            newWindow={page.newWindow}
            aria-current={!page.newWindow && isActive}
          >
            {page.title}
          </Anchor>
        )
      })}
      <div className="max-md:_hidden">{themeConfig.search}</div>

      {project}
      {chat}

      {children}

      <Button
        aria-label="Menu"
        className={({ active }) =>
          cn(
            'nextra-hamburger _rounded md:_hidden',
            active && '_bg-gray-400/20'
          )
        }
        onClick={() => setMenu(prev => !prev)}
      >
        <MenuIcon height="24" className={cn({ open: menu })} />
      </Button>
    </>
  )
}
