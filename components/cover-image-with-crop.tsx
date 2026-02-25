'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Move, Check, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CoverImageCrop {
  x: number
  y: number
  zoom?: number
}

interface CoverImageWithCropProps {
  src: string
  alt: string
  fallbackSrc?: string
  entityType: 'countries' | 'universities' | 'university_campuses' | 'announcements'
  entityId: number
  crop?: CoverImageCrop | null
  containerClassName?: string
  imageClassName?: string
  useNextImage?: boolean
  priority?: boolean
  children?: React.ReactNode
}

export function CoverImageWithCrop({
  src,
  alt,
  fallbackSrc = '/hero-bg.jpg',
  entityType,
  entityId,
  crop,
  containerClassName = '',
  children,
}: CoverImageWithCropProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  // Crop state -- fetched fresh from DB to bypass static cache
  const [liveCrop, setLiveCrop] = useState<CoverImageCrop>(crop || { x: 50, y: 50, zoom: 1 })
  const [editCrop, setEditCrop] = useState<CoverImageCrop>(crop || { x: 50, y: 50, zoom: 1 })

  // Drag state
  const isDragging = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const dragStartCrop = useRef({ x: 50, y: 50 })
  const editorRef = useRef<HTMLDivElement>(null)

  // Check admin session
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch('/api/admin/session', { credentials: 'same-origin' })
        const data = await res.json()
        setIsAdmin(data.authenticated === true)
      } catch {
        setIsAdmin(false)
      }
    }
    checkAdmin()
  }, [])

  // Fetch live crop from DB to bypass static page cache
  useEffect(() => {
    const fetchLiveCrop = async () => {
      try {
        const res = await fetch(`/api/admin/cover-image-crop?entityType=${entityType}&entityId=${entityId}`)
        if (res.ok) {
          const data = await res.json()
          if (data.crop) {
            const fetched = { x: data.crop.x ?? 50, y: data.crop.y ?? 50, zoom: data.crop.zoom ?? 1 }
            setLiveCrop(fetched)
            setEditCrop(fetched)
          }
        }
      } catch {
        // Fall back to prop
      }
    }
    fetchLiveCrop()
  }, [entityType, entityId])

  // Handle broken image
  useEffect(() => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => setImgSrc(src || fallbackSrc)
    img.onerror = () => setImgSrc(fallbackSrc)
    img.src = src || fallbackSrc
  }, [src, fallbackSrc])

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    dragStartCrop.current = { x: editCrop.x, y: editCrop.y }
  }, [editCrop])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    isDragging.current = true
    dragStartPos.current = { x: touch.clientX, y: touch.clientY }
    dragStartCrop.current = { x: editCrop.x, y: editCrop.y }
  }, [editCrop])

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging.current || !editorRef.current) return
    const rect = editorRef.current.getBoundingClientRect()
    const zoom = editCrop.zoom || 1
    const sensitivity = zoom > 0.5 ? 100 / zoom : 200
    const dx = ((clientX - dragStartPos.current.x) / rect.width) * -sensitivity
    const dy = ((clientY - dragStartPos.current.y) / rect.height) * -sensitivity
    setEditCrop(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100, dragStartCrop.current.x + dx)),
      y: Math.max(0, Math.min(100, dragStartCrop.current.y + dy)),
    }))
  }, [editCrop.zoom])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY)
  }, [handleMove])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX, e.touches[0].clientY)
  }, [handleMove])

  const handleEnd = useCallback(() => {
    isDragging.current = false
  }, [])

  // Zoom handlers
  const handleZoomIn = () => {
    setEditCrop(prev => ({ ...prev, zoom: Math.min(3, (prev.zoom || 1) + 0.1) }))
  }

  const handleZoomOut = () => {
    setEditCrop(prev => ({ ...prev, zoom: Math.max(0.3, (prev.zoom || 1) - 0.1) }))
  }

  const handleZoomSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditCrop(prev => ({ ...prev, zoom: parseFloat(e.target.value) }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/cover-image-crop', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ entityType, entityId, crop: editCrop }),
      })
      if (res.ok) {
        setLiveCrop(editCrop)
        setIsEditing(false)
      }
    } catch {
      // Failed
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setEditCrop({ x: 50, y: 50, zoom: 1 })
  }

  const handleCancel = () => {
    setEditCrop(liveCrop)
    setIsEditing(false)
  }

  const displayCrop = isEditing ? editCrop : liveCrop
  const zoom = displayCrop.zoom || 1

  // Use background-image for rendering. This allows zoom-out (< 100%) to show more
  // of the image within the container without shrinking the container itself.
  // background-size controls how big the image is relative to the container:
  //   zoom=1 (100%) => "cover" equivalent
  //   zoom=2 (200%) => zoomed in, image is 2x bigger
  //   zoom=0.5 (50%) => zoomed out, more of the image is visible
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${imgSrc})`,
    backgroundPosition: `${displayCrop.x}% ${displayCrop.y}%`,
    backgroundRepeat: 'no-repeat',
    // At zoom=1 we want "cover" behavior. For zoom > 1 we scale up.
    // For zoom < 1 we show more of the image.
    backgroundSize: zoom >= 1 ? `${zoom * 100}%` : `auto ${zoom * 100}%`,
  }

  // For zoom < 1, use a special calculation that prevents whitespace:
  // We need to ensure the image still fills at least one dimension.
  // "cover" at 100% means the smaller dimension is 100%. 
  // For zoom < 1, we use "auto X%" only if it won't leave gaps.
  // The safest approach: always use "cover" at zoom=1, and for other values
  // compute a size that keeps the image proportionally controlled.
  if (zoom >= 1) {
    bgStyle.backgroundSize = `${zoom * 100}%`
  } else {
    // When zooming out, show more of the image. 
    // We set the size smaller than "cover" so more of the image is visible.
    // Using a percentage below 100% will naturally show more of the image.
    bgStyle.backgroundSize = `${zoom * 100}%`
  }

  return (
    <div className={`${containerClassName} group/cover`}>
      {/* Background image layer */}
      <div
        className="absolute inset-0"
        style={bgStyle}
        role="img"
        aria-label={alt}
      />

      {/* Admin edit button */}
      {isAdmin && !isEditing && (
        <button
          onClick={() => {
            setEditCrop(liveCrop)
            setIsEditing(true)
          }}
          className="absolute top-3 right-3 z-20 bg-black/60 hover:bg-black/80 text-white rounded-lg px-3 py-2 flex items-center gap-2 text-xs font-medium opacity-0 group-hover/cover:opacity-100 transition-opacity cursor-pointer"
        >
          <Move className="h-3.5 w-3.5" />
          Reposition
        </button>
      )}

      {/* Editing overlay */}
      {isEditing && (
        <div
          ref={editorRef}
          className="absolute inset-0 z-30 cursor-move select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleEnd}
        >
          {/* Dashed border */}
          <div className="absolute inset-0 border-4 border-dashed border-white/60 pointer-events-none" />

          {/* Instruction text */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium pointer-events-none flex items-center gap-2">
            <Move className="h-4 w-4" />
            Drag to reposition
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-40 pointer-events-auto bg-black/70 rounded-lg px-4 py-2">
            <button onClick={handleZoomOut} className="text-white hover:text-teal-300 transition-colors cursor-pointer">
              <ZoomOut className="h-5 w-5" />
            </button>
            <input
              type="range"
              min="0.3"
              max="3"
              step="0.05"
              value={editCrop.zoom || 1}
              onChange={handleZoomSlider}
              className="w-32 accent-teal-500 cursor-pointer"
            />
            <button onClick={handleZoomIn} className="text-white hover:text-teal-300 transition-colors cursor-pointer">
              <ZoomIn className="h-5 w-5" />
            </button>
            <span className="text-white text-xs font-mono ml-1 min-w-[36px]">
              {((editCrop.zoom || 1) * 100).toFixed(0)}%
            </span>
          </div>

          {/* Controls toolbar */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40 pointer-events-auto">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saving}
              className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg"
            >
              <Check className="h-4 w-4 mr-1" />
              {saving ? 'Saving...' : 'Save Position'}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleReset}
              className="bg-white/90 hover:bg-white text-slate-700 shadow-lg"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Center
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCancel}
              className="bg-white/90 hover:bg-white text-slate-700 shadow-lg"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Pass-through children (text overlays, gradients, etc.) */}
      {!isEditing && children}
    </div>
  )
}
