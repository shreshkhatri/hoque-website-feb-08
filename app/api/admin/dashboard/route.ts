import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/admin-auth'
import { supabaseAdmin as supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const session = await verifySession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const months = parseInt(searchParams.get('months') || '3')

  const startDate = new Date()
  startDate.setMonth(startDate.getMonth() - months)
  const startISO = startDate.toISOString()

  try {
    const [
      { count: totalUniversities },
      { count: totalCourses },
      { count: totalCountries },
      { count: totalMessages },
      { count: newMessages },
      { count: totalApplications },
      { count: newApplications },
      { count: activeVacancies },
      { data: recentMessages },
      { data: recentApplications },
      { data: messagesOverTime },
      { data: applicationsByStatus },
    ] = await Promise.all([
      supabase.from('universities').select('*', { count: 'exact', head: true }),
      supabase.from('courses').select('*', { count: 'exact', head: true }),
      supabase.from('countries').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('job_applications').select('*', { count: 'exact', head: true }),
      supabase.from('job_applications').select('*', { count: 'exact', head: true }).eq('status', 'new'),
      supabase.from('vacancies').select('*', { count: 'exact', head: true }).eq('is_active', true),
      supabase.from('contact_messages').select('id, first_name, last_name, email, subject, status, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('job_applications').select('id, full_name, email, status, created_at, vacancies(title)').order('created_at', { ascending: false }).limit(5),
      supabase.from('contact_messages').select('created_at, status').gte('created_at', startISO).order('created_at', { ascending: true }),
      supabase.from('job_applications').select('status'),
    ])

    // Aggregate messages by month for chart
    const monthlyMessages: Record<string, number> = {}
    messagesOverTime?.forEach((msg: any) => {
      const d = new Date(msg.created_at)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      monthlyMessages[key] = (monthlyMessages[key] || 0) + 1
    })

    const messageChartData = Object.entries(monthlyMessages).map(([month, count]) => ({
      month,
      count,
    }))

    // Application status breakdown
    const statusBreakdown: Record<string, number> = {}
    applicationsByStatus?.forEach((app: any) => {
      const s = app.status || 'new'
      statusBreakdown[s] = (statusBreakdown[s] || 0) + 1
    })

    const statusChartData = Object.entries(statusBreakdown).map(([status, count]) => ({
      status: status.charAt(0).toUpperCase() + status.slice(1),
      count,
    }))

    return NextResponse.json({
      stats: {
        totalUniversities: totalUniversities || 0,
        totalCourses: totalCourses || 0,
        totalCountries: totalCountries || 0,
        totalMessages: totalMessages || 0,
        newMessages: newMessages || 0,
        totalApplications: totalApplications || 0,
        newApplications: newApplications || 0,
        activeVacancies: activeVacancies || 0,
      },
      recentMessages: recentMessages || [],
      recentApplications: recentApplications || [],
      messageChartData,
      statusChartData,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
  }
}
