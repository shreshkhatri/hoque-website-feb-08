'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  GraduationCap,
  BookOpen,
  Globe,
  MessageSquare,
  Briefcase,
  BriefcaseBusiness,
  TrendingUp,
  Clock,
  Mail,
  User,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

interface DashboardStats {
  totalUniversities: number
  totalCourses: number
  totalCountries: number
  totalMessages: number
  newMessages: number
  totalApplications: number
  newApplications: number
  activeVacancies: number
}

interface RecentMessage {
  id: number
  first_name: string
  last_name: string
  email: string
  subject: string
  status: string
  created_at: string
}

interface RecentApplication {
  id: number
  full_name: string
  email: string
  status: string
  created_at: string
  vacancies: { title: string } | null
}

const STATUS_COLORS: Record<string, string> = {
  New: '#14b8a6',
  Reviewed: '#3b82f6',
  Contacted: '#a855f7',
  Resolved: '#22c55e',
  Rejected: '#ef4444',
  Shortlisted: '#f59e0b',
  Interviewed: '#8b5cf6',
  Hired: '#22c55e',
}

const PIE_COLORS = ['#14b8a6', '#3b82f6', '#a855f7', '#f59e0b', '#22c55e', '#ef4444']

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function statusColor(status: string) {
  const s = status?.toLowerCase()
  if (s === 'new') return 'bg-teal-500/15 text-teal-400 border-teal-500/20'
  if (s === 'reviewed' || s === 'contacted') return 'bg-blue-500/15 text-blue-400 border-blue-500/20'
  if (s === 'resolved' || s === 'hired') return 'bg-green-500/15 text-green-400 border-green-500/20'
  if (s === 'rejected') return 'bg-red-500/15 text-red-400 border-red-500/20'
  if (s === 'shortlisted' || s === 'interviewed') return 'bg-amber-500/15 text-amber-400 border-amber-500/20'
  return 'bg-slate-500/15 text-slate-400 border-slate-500/20'
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentMessages, setRecentMessages] = useState<RecentMessage[]>([])
  const [recentApplications, setRecentApplications] = useState<RecentApplication[]>([])
  const [messageChartData, setMessageChartData] = useState<any[]>([])
  const [statusChartData, setStatusChartData] = useState<any[]>([])
  const [months, setMonths] = useState('3')
  const [loading, setLoading] = useState(true)

  const fetchDashboard = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/dashboard?months=${months}`)
      const data = await res.json()
      setStats(data.stats)
      setRecentMessages(data.recentMessages || [])
      setRecentApplications(data.recentApplications || [])
      setMessageChartData(data.messageChartData || [])
      setStatusChartData(data.statusChartData || [])
    } catch (err) {
      console.error('Failed to fetch dashboard:', err)
    } finally {
      setLoading(false)
    }
  }, [months])

  useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const statCards = stats
    ? [
        { label: 'Universities', value: stats.totalUniversities, icon: GraduationCap, color: 'text-teal-400', bg: 'bg-teal-400/10' },
        { label: 'Courses', value: stats.totalCourses, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Countries', value: stats.totalCountries, icon: Globe, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { label: 'Messages', value: stats.totalMessages, icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-400/10', badge: stats.newMessages > 0 ? `${stats.newMessages} new` : undefined },
        { label: 'Applications', value: stats.totalApplications, icon: Briefcase, color: 'text-rose-400', bg: 'bg-rose-400/10', badge: stats.newApplications > 0 ? `${stats.newApplications} new` : undefined },
        { label: 'Active Vacancies', value: stats.activeVacancies, icon: BriefcaseBusiness, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
      ]
    : []

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Overview</h2>
          <p className="text-sm text-slate-400">Key metrics and recent activity</p>
        </div>
        <Select value={months} onValueChange={setMonths}>
          <SelectTrigger className="w-[160px] bg-[#111827] border-slate-700/50 text-slate-200 h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#111827] border-slate-700/50">
            <SelectItem value="1" className="text-slate-200 focus:bg-slate-800 focus:text-white">Last 1 month</SelectItem>
            <SelectItem value="3" className="text-slate-200 focus:bg-slate-800 focus:text-white">Last 3 months</SelectItem>
            <SelectItem value="6" className="text-slate-200 focus:bg-slate-800 focus:text-white">Last 6 months</SelectItem>
            <SelectItem value="12" className="text-slate-200 focus:bg-slate-800 focus:text-white">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="bg-[#111827] border-slate-800/50">
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-16 mb-3 bg-slate-700/50" />
                  <Skeleton className="h-8 w-12 bg-slate-700/50" />
                </CardContent>
              </Card>
            ))
          : statCards.map((card) => (
              <Card key={card.label} className="bg-[#111827] border-slate-800/50 hover:border-slate-700/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-400">{card.label}</span>
                    <div className={`p-1.5 rounded-md ${card.bg}`}>
                      <card.icon className={`h-3.5 w-3.5 ${card.color}`} />
                    </div>
                  </div>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold text-white">{card.value}</span>
                    {card.badge && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-teal-500/10 text-teal-400 border-teal-500/20 mb-0.5">
                        {card.badge}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Messages Over Time */}
        <Card className="bg-[#111827] border-slate-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-teal-400" />
              Messages Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[220px] bg-slate-700/30 rounded-lg" />
            ) : messageChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={messageChartData} barSize={32}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={{ stroke: '#1e293b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#e2e8f0' }}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Bar dataKey="count" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Messages" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-slate-500">
                No message data for this period
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Status Breakdown */}
        <Card className="bg-[#111827] border-slate-800/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-400" />
              Application Status Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[220px] bg-slate-700/30 rounded-lg" />
            ) : statusChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    paddingAngle={4}
                    label={({ status, count }) => `${status}: ${count}`}
                  >
                    {statusChartData.map((entry: any, index: number) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#e2e8f0' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[220px] flex items-center justify-center text-sm text-slate-500">
                No application data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Messages */}
        <Card className="bg-[#111827] border-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-400" />
              Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full bg-slate-700/50" />
                    <div className="flex-1">
                      <Skeleton className="h-3.5 w-32 mb-1.5 bg-slate-700/50" />
                      <Skeleton className="h-3 w-48 bg-slate-700/50" />
                    </div>
                  </div>
                ))
              : recentMessages.length > 0
                ? recentMessages.map((msg) => (
                    <div key={msg.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/40 transition-colors">
                      <div className="h-9 w-9 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 text-xs font-bold flex-shrink-0">
                        {msg.first_name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">{msg.first_name} {msg.last_name}</p>
                        <p className="text-xs text-slate-500 truncate">{msg.subject || msg.email}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusColor(msg.status)}`}>
                          {msg.status}
                        </Badge>
                        <span className="text-[10px] text-slate-600">{formatDate(msg.created_at)}</span>
                      </div>
                    </div>
                  ))
                : (
                    <p className="text-sm text-slate-500 text-center py-6">No messages yet</p>
                  )}
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card className="bg-[#111827] border-slate-800/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <User className="h-4 w-4 text-rose-400" />
              Recent Job Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 rounded-full bg-slate-700/50" />
                    <div className="flex-1">
                      <Skeleton className="h-3.5 w-32 mb-1.5 bg-slate-700/50" />
                      <Skeleton className="h-3 w-48 bg-slate-700/50" />
                    </div>
                  </div>
                ))
              : recentApplications.length > 0
                ? recentApplications.map((app) => (
                    <div key={app.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-800/40 transition-colors">
                      <div className="h-9 w-9 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-400 text-xs font-bold flex-shrink-0">
                        {app.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">{app.full_name}</p>
                        <p className="text-xs text-slate-500 truncate">{app.vacancies?.title || 'General Application'}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${statusColor(app.status)}`}>
                          {app.status}
                        </Badge>
                        <span className="text-[10px] text-slate-600">{formatDate(app.created_at)}</span>
                      </div>
                    </div>
                  ))
                : (
                    <p className="text-sm text-slate-500 text-center py-6">No applications yet</p>
                  )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
