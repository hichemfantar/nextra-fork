import type { Dispatch, SetStateAction } from 'react'
import { create } from 'zustand'

const useMenuStore = create<{
  hasMenu: boolean
  actions: {
    setMenu: Dispatch<SetStateAction<boolean>>
  }
}>(set => ({
  hasMenu: false,
  actions: {
    setMenu(fn) {
      set(state => {
        const hasMenu = typeof fn === 'function' ? fn(state.hasMenu) : fn
        // Lock background scroll when menu is opened
        document.body.classList.toggle('_overflow-hidden', hasMenu)
        return { hasMenu }
      })
    }
  }
}))

export const useMenu = () => useMenuStore(state => state.hasMenu)

export const useMenuActions = () => useMenuStore(state => state.actions)
