'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

interface ConfirmOptions {
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'default'
}

interface ToastContextType {
  showToast: (type: ToastType, title: string, message?: string, duration?: number) => void
  showConfirm: (options: ConfirmOptions) => Promise<boolean>
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const colorMap = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  info: 'border-blue-200 bg-blue-50 text-blue-900',
}

const iconColorMap = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  warning: 'text-amber-500',
  info: 'text-blue-500',
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const Icon = iconMap[toast.type]
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const duration = toast.duration ?? 4000
    const exitTimer = setTimeout(() => setExiting(true), duration - 300)
    const removeTimer = setTimeout(() => onDismiss(toast.id), duration)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [toast, onDismiss])

  return (
    <div
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm w-full transition-all duration-300',
        colorMap[toast.type],
        exiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
      )}
      role="alert"
    >
      <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', iconColorMap[toast.type])} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.message && <p className="text-sm mt-0.5 opacity-80">{toast.message}</p>}
      </div>
      <button
        onClick={() => { setExiting(true); setTimeout(() => onDismiss(toast.id), 300) }}
        className="p-0.5 rounded hover:bg-black/5 flex-shrink-0"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4 opacity-50" />
      </button>
    </div>
  )
}

function ConfirmDialog({
  options,
  onResolve,
}: {
  options: ConfirmOptions
  onResolve: (confirmed: boolean) => void
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => onResolve(false)} />
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-start gap-4">
          <div className={cn(
            'h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0',
            options.variant === 'danger' ? 'bg-red-100' : 'bg-blue-100'
          )}>
            {options.variant === 'danger' ? (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            ) : (
              <Info className="h-5 w-5 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">{options.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{options.message}</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            onClick={() => onResolve(false)}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            {options.cancelLabel || 'Cancel'}
          </button>
          <button
            onClick={() => onResolve(true)}
            className={cn(
              'px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors',
              options.variant === 'danger'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-teal-600 hover:bg-teal-700'
            )}
          >
            {options.confirmLabel || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [confirmState, setConfirmState] = useState<{
    options: ConfirmOptions
    resolve: (val: boolean) => void
  } | null>(null)

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback((type: ToastType, title: string, message?: string, duration?: number) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, type, title, message, duration }])
  }, [])

  const resolveRef = useRef<((val: boolean) => void) | null>(null)

  const showConfirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      resolveRef.current = resolve
      setConfirmState({ options, resolve })
    })
  }, [])

  const handleConfirmResolve = useCallback((confirmed: boolean) => {
    if (resolveRef.current) {
      resolveRef.current(confirmed)
      resolveRef.current = null
    }
    setConfirmState(null)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast, showConfirm }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>

      {/* Confirm Dialog */}
      {confirmState && (
        <ConfirmDialog
          options={confirmState.options}
          onResolve={handleConfirmResolve}
        />
      )}
    </ToastContext.Provider>
  )
}
