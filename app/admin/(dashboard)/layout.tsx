'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  MessageSquare,
  Briefcase,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface AdminSession {
  id: number
  email: string
  name: string
}

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/universities', label: 'Universities', icon: GraduationCap },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/applications', label: 'Job Applications', icon: Briefcase },
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [admin, setAdmin] = useState<AdminSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/admin/session', { credentials: 'same-origin' })
        const data = await res.json()
        if (!data.authenticated) {
          window.location.href = '/admin'
          return
        }
        setAdmin(data.admin)
      } catch {
        window.location.href = '/admin'
      } finally {
        setLoading(false)
      }
    }
    checkSession()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' })
    window.location.href = '/admin'
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-slate-200 border-t-teal-500" />
          <p className="text-sm text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!admin) return null

  const currentPage = navItems.find((item) => pathname.startsWith(item.href))

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 lg:relative lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-200">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image
              src="/hoque-logo.png"
              alt="HOQUE"
              width={358}
              height={76}
              className="h-7 w-auto"
            />
            <span className="text-[10px] font-semibold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded">
              ADMIN
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-600 hover:text-slate-900"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                <item.icon className={cn('h-4.5 w-4.5', isActive ? 'text-teal-600' : 'text-slate-500')} />
                {item.label}
                {isActive && <ChevronRight className="h-3.5 w-3.5 ml-auto text-teal-600/60" />}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 text-xs font-bold">
              {admin.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">{admin.name}</p>
              <p className="text-xs text-slate-600 truncate">{admin.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center h-16 px-4 sm:px-6 border-b border-slate-200 bg-white/50 backdrop-blur-sm flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 ml-2 lg:ml-0">
            <h1 className="text-lg font-semibold text-slate-900">
              {currentPage?.label || 'Admin'}
            </h1>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
