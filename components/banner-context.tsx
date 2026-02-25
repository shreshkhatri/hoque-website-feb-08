'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

interface BannerContextType {
  bannerHeight: number
  bannerVisible: boolean
  setBannerRef: (el: HTMLDivElement | null) => void
  dismissBanner: () => void
}

const BannerContext = createContext<BannerContextType>({
  bannerHeight: 0,
  bannerVisible: false,
  setBannerRef: () => {},
  dismissBanner: () => {},
})

export function BannerProvider({ children }: { children: React.ReactNode }) {
  const [bannerHeight, setBannerHeight] = useState(0)
  const [bannerVisible, setBannerVisible] = useState(false)
  const observerRef = useRef<ResizeObserver | null>(null)

  const setBannerRef = useCallback((el: HTMLDivElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    if (el) {
      setBannerVisible(true)
      setBannerHeight(el.offsetHeight)
      observerRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setBannerHeight(entry.contentRect.height)
        }
      })
      observerRef.current.observe(el)
    } else {
      setBannerVisible(false)
      setBannerHeight(0)
    }
  }, [])

  const dismissBanner = useCallback(() => {
    setBannerVisible(false)
    setBannerHeight(0)
  }, [])

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect()
    }
  }, [])

  return (
    <BannerContext.Provider value={{ bannerHeight, bannerVisible, setBannerRef, dismissBanner }}>
      {children}
    </BannerContext.Provider>
  )
}

export function useBanner() {
  return useContext(BannerContext)
}
