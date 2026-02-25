'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Move, Check, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CoverImageCrop {
  x: number // 0-100 percentage
  y: number // 0-100 percentage
}

interface CoverImageWithCropProps {
  src: string
  alt: string
  fallbackSrc?: string
  entityType: 'countries' | 'universities' | 'university_campuses' | 'announcements'
  entityId: number
  crop?: CoverImageCrop | null
  // Pass-through classes for the container
  containerClassName?: string
  imageClassName?: string
  // Whether to use next/image fill or regular img
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
  const [currentCrop, setCurrentCrop] = useState<CoverImageCrop>(crop || { x: 50, y: 50 })
  const [editCrop, setEditCrop] = useState<CoverImageCrop>(crop || { x: 50, y: 50 })
  const [saving, setSaving] = useState(false)
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc)

  // Drag state
  const isDragging = useRef(false)
  const dragStartPos = useRef({ x: 0, y: 0 })
  const dragStartCrop = useRef({ x: 50, y: 50 })
  const editorRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (crop) {
      setCurrentCrop(crop)
      setEditCrop(crop)
    }
  }, [crop])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    dragStartPos.current = { x: e.clientX, y: e.clientY }
    dragStartCrop.current = { ...editCrop }
  }, [editCrop])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    isDragging.current = true
    dragStartPos.current = { x: touch.clientX, y: touch.clientY }
    dragStartCrop.current = { ...editCrop }
  }, [editCrop])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !editorRef.current) return
    const rect = editorRef.current.getBoundingClientRect()
    const dx = ((e.clientX - dragStartPos.current.x) / rect.width) * -100
    const dy = ((e.clientY - dragStartPos.current.y) / rect.height) * -100
    setEditCrop({
      x: Math.max(0, Math.min(100, dragStartCrop.current.x + dx)),
      y: Math.max(0, Math.min(100, dragStartCrop.current.y + dy)),
    })
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current || !editorRef.current) return
    const touch = e.touches[0]
    const rect = editorRef.current.getBoundingClientRect()
    const dx = ((touch.clientX - dragStartPos.current.x) / rect.width) * -100
    const dy = ((touch.clientY - dragStartPos.current.y) / rect.height) * -100
    setEditCrop({
      x: Math.max(0, Math.min(100, dragStartCrop.current.x + dx)),
      y: Math.max(0, Math.min(100, dragStartCrop.current.y + dy)),
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/cover-image-crop', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          entityType,
          entityId,
          crop: editCrop,
        }),
      })
      if (res.ok) {
        setCurrentCrop(editCrop)
        setIsEditing(false)
      }
    } catch {
      // Failed to save
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setEditCrop({ x: 50, y: 50 })
  }

  const handleCancel = () => {
    setEditCrop(currentCrop)
    setIsEditing(false)
  }

  const objectPosition = `${currentCrop.x}% ${currentCrop.y}%`
  const editObjectPosition = `${editCrop.x}% ${editCrop.y}%`

  return (
    <div className={`${containerClassName} group/cover`}>
      {/* The actual image */}
      {useNextImage ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          className={imageClassName || 'object-cover'}
          style={{ objectPosition: isEditing ? editObjectPosition : objectPosition }}
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
          style={{ objectPosition: isEditing ? editObjectPosition : objectPosition }}
          onError={() => {
            if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc)
          }}
        />
      )}

      {/* Admin edit button */}
      {isAdmin && !isEditing && (
        <button
          onClick={() => setIsEditing(true)}
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
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Semi-transparent border to indicate editing mode */}
          <div className="absolute inset-0 border-4 border-dashed border-white/60 pointer-events-none" />

          {/* Instruction text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium pointer-events-none flex items-center gap-2">
            <Move className="h-4 w-4" />
            Drag to reposition
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

      {/* Pass-through children (overlays, gradients, text, etc.) */}
      {!isEditing && children}
    </div>
  )
}
