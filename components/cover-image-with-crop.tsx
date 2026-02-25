'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
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
  imageClassName = '',
  useNextImage = true,
  priority = false,
  children,
}: CoverImageWithCropProps) {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  // Crop state -- fetched fresh from DB to bypass static cache
  const [liveCrop, setLiveCrop] = useState<CoverImageCrop>(crop || { x: 50, y: 50, zoom: 1 })
  const [editCrop, setEditCrop] = useState<CoverImageCrop>(crop || { x: 50, y: 50, zoom: 1 })
  const [hasFetchedLive, setHasFetchedLive] = useState(false)

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
      } finally {
        setHasFetchedLive(true)
      }
    }
    fetchLiveCrop()
  }, [entityType, entityId])

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
    // More zoom = more image overflow = smaller % change per pixel
    const sensitivity = zoom > 1 ? 100 / zoom : 100
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
    setEditCrop(prev => ({ ...prev, zoom: Math.max(1, (prev.zoom || 1) - 0.1) }))
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
  const objectPosition = `${displayCrop.x}% ${displayCrop.y}%`
  const zoom = displayCrop.zoom || 1
  const imageStyle: React.CSSProperties = {
    objectPosition,
    transform: zoom !== 1 ? `scale(${zoom})` : undefined,
    transformOrigin: `${displayCrop.x}% ${displayCrop.y}%`,
  }

  return (
    <div className={`${containerClassName} group/cover`}>
      {/* The actual image */}
      {useNextImage ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={imageClassName || 'object-cover'}
          style={imageStyle}
          priority={priority}
          onError={() => {
            if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc)
          }}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc}
          alt={alt}
          className={imageClassName || 'absolute inset-0 w-full h-full object-cover'}
          style={imageStyle}
          onError={() => {
            if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc)
          }}
        />
      )}

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
            <button onClick={handleZoomOut} className="text-white hover:text-teal-300 transition-colors">
              <ZoomOut className="h-5 w-5" />
            </button>
            <input
              type="range"
              min="1"
              max="3"
              step="0.05"
              value={editCrop.zoom || 1}
              onChange={handleZoomSlider}
              className="w-32 accent-teal-500 cursor-pointer"
            />
            <button onClick={handleZoomIn} className="text-white hover:text-teal-300 transition-colors">
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

      {/* Pass-through children */}
      {!isEditing && children}
    </div>
  )
}
