/**
 * Centralised badge colour helpers.
 * All components that display program-level or announcement-type badges
 * should import from here to stay consistent.
 */

// ---------------------------------------------------------------------------
// Programme / course level badges
// ---------------------------------------------------------------------------

/**
 * Returns Tailwind classes for a course/scholarship programme-level badge.
 * Call with the raw `level` string stored in the DB.
 */
export function getLevelBadgeColor(level: string | null | undefined): string {
  if (!level) return 'bg-slate-100 text-slate-600 border-slate-200'
  const l = level.toLowerCase()

  if (l.includes('undergraduate') || l.includes('bachelor')) {
    // Blue — undergraduate / bachelor's
    return 'bg-blue-50 text-blue-700 border-blue-200'
  }
  if (l.includes('master') || l.includes('postgraduate') || l.includes('msc') || l.includes('mba')) {
    // Indigo — master's / postgraduate
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'
  }
  if (l.includes('phd') || l.includes('doctor') || l.includes('doctoral')) {
    // Amber — PhD / doctoral
    return 'bg-amber-50 text-amber-700 border-amber-200'
  }
  if (l.includes('foundation')) {
    // Orange — foundation year
    return 'bg-orange-50 text-orange-700 border-orange-200'
  }
  if (l.includes('diploma')) {
    // Teal — diploma
    return 'bg-teal-50 text-teal-700 border-teal-200'
  }
  if (l.includes('certificate')) {
    // Emerald — certificate
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
  if (l.includes('research')) {
    // Rose — research
    return 'bg-rose-50 text-rose-700 border-rose-200'
  }
  if (l.includes('pre')) {
    // Purple — pre-master / pre-sessional
    return 'bg-purple-50 text-purple-700 border-purple-200'
  }
  return 'bg-slate-100 text-slate-600 border-slate-200'
}

// ---------------------------------------------------------------------------
// Announcement type badges
// ---------------------------------------------------------------------------

/**
 * Returns Tailwind classes for an announcement-type badge.
 */
export function getAnnouncementTypeBadgeColor(type: string | null | undefined): string {
  switch (type) {
    case 'scholarship':
      // Emerald — money/opportunity
      return 'bg-emerald-50 text-emerald-700 border-emerald-200'
    case 'deadline':
      // Red — urgency / time limit
      return 'bg-red-50 text-red-700 border-red-200'
    case 'event':
      // Violet — event / gathering
      return 'bg-violet-50 text-violet-700 border-violet-200'
    case 'news':
      // Sky — informational / news
      return 'bg-sky-50 text-sky-700 border-sky-200'
    case 'general':
    default:
      // Slate — neutral / general
      return 'bg-slate-50 text-slate-700 border-slate-200'
  }
}

/**
 * Top accent-line colour for announcement cards (solid Tailwind bg colour).
 */
export function getAnnouncementTypeAccentBar(type: string | null | undefined): string {
  switch (type) {
    case 'scholarship': return 'bg-emerald-500'
    case 'deadline':    return 'bg-red-500'
    case 'event':       return 'bg-violet-500'
    case 'news':        return 'bg-sky-500'
    default:            return 'bg-slate-400'
  }
}

// ---------------------------------------------------------------------------
// Eligibility type badges (scholarships)
// ---------------------------------------------------------------------------

export function getEligibilityBadgeColor(type: string | null | undefined): string {
  if (!type) return 'bg-slate-100 text-slate-600 border-slate-200'
  const t = type.toLowerCase()
  if (t.includes('international') && t.includes('domestic')) return 'bg-blue-50 text-blue-700 border-blue-200'
  if (t.includes('international')) return 'bg-cyan-50 text-cyan-700 border-cyan-200'
  if (t.includes('domestic'))      return 'bg-green-50 text-green-700 border-green-200'
  if (t.includes('worldwide'))     return 'bg-purple-50 text-purple-700 border-purple-200'
  return 'bg-slate-100 text-slate-600 border-slate-200'
}
