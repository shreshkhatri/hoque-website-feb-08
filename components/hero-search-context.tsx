'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'

interface HeroSearchContextType {
  /** true when the hero search box is visible in the viewport below the header */
  heroSearchVisible: boolean
  /** called by the hero component to register/unregister the search box element */
  setHeroSearchElement: (el: HTMLElement | null) => void
  /** whether we're on the home page (hero exists) */
  isHomePage: boolean
}

const HeroSearchContext = createContext<HeroSearchContextType>({
  heroSearchVisible: false,
  setHeroSearchElement: () => {},
  isHomePage: false,
})

export function useHeroSearch() {
  return useContext(HeroSearchContext)
}

export function HeroSearchProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [heroSearchVisible, setHeroSearchVisible] = useState(isHomePage)
  const [heroSearchElement, setHeroSearchElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // If not on the home page, the hero search is never visible
    if (!isHomePage) {
      setHeroSearchVisible(false)
      return
    }

    // If on home page but no element registered yet, assume visible (initial state)
    if (!heroSearchElement) {
      setHeroSearchVisible(true)
      return
    }

    // The rootMargin offsets the observation area by -64px from the top
    // (the height of the sticky header), so the element is considered
    // "not intersecting" once it scrolls behind the header bar.
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroSearchVisible(entry.isIntersecting)
      },
      {
        root: null,
        rootMargin: '-68px 0px 0px 0px', // 64px header + 4px buffer
        threshold: 0.1,
      }
    )

    observer.observe(heroSearchElement)
    return () => observer.disconnect()
  }, [heroSearchElement, isHomePage])

  const registerElement = useCallback((el: HTMLElement | null) => {
    setHeroSearchElement(el)
  }, [])

  return (
    <HeroSearchContext.Provider
      value={{
        heroSearchVisible,
        setHeroSearchElement: registerElement,
        isHomePage,
      }}
    >
      {children}
    </HeroSearchContext.Provider>
  )
}
