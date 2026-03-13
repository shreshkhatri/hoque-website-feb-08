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
  const l = level.toLowerCase().trim()

  if (l === 'Bachelor')
    return 'bg-blue-50 text-blue-700 border-blue-200'
  if (l === 'Master')
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'
  if (l === 'Phd')
    return 'bg-amber-50 text-amber-700 border-amber-200'
  if (l === 'MBA')
    return 'bg-violet-50 text-violet-700 border-violet-200'
  if (l === 'Mphil')
    return 'bg-purple-50 text-purple-700 border-purple-200'
  if (l === 'Foundation')
    return 'bg-orange-50 text-orange-700 border-orange-200'
  if (l === 'Diploma')
    return 'bg-teal-50 text-teal-700 border-teal-200'
  if (l === 'HND' || l === 'HNC')
    return 'bg-teal-50 text-teal-700 border-teal-200'
  if (l === 'Certificate')
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (l === 'Pgdip' || l === 'Pgce')
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'
  if (l === 'Doctoral')
    return 'bg-amber-50 text-amber-700 border-amber-200'
  if (l === 'Research')
    return 'bg-rose-50 text-rose-700 border-rose-200'
  if (l === 'Postgraduate')
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'

  // Fallback: pattern matching for any other values
  if (l.includes('Bachelor') || l.includes('undergraduate'))
    return 'bg-blue-50 text-blue-700 border-blue-200'
  if (l.includes('Master') || l.includes('msc'))
    return 'bg-indigo-50 text-indigo-700 border-indigo-200'
  if (l.includes('Phd') || l.includes('doctor'))
    return 'bg-amber-50 text-amber-700 border-amber-200'
  if (l.includes('Foundation'))
    return 'bg-orange-50 text-orange-700 border-orange-200'
  if (l.includes('Diploma'))
    return 'bg-teal-50 text-teal-700 border-teal-200'
  if (l.includes('Certificate'))
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  if (l.includes('Research'))
    return 'bg-rose-50 text-rose-700 border-rose-200'

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
    case 'scholarship': return 'badge-emerald' // Emerald — money/opportunity
    case 'deadline': return 'badge-red'     // Red — urgency / time limit
    case 'event': return 'badge-violet'  // Violet — event / gathering
    case 'news': return 'badge-sky'     // Sky — informational / news
    default: return 'badge-slate'   // Slate — neutral / general
  }
}

/**
 * Top accent-line colour for announcement cards (solid bg colour).
 */
export function getAnnouncementTypeAccentBar(type: string | null | undefined): string {
  switch (type) {
    case 'scholarship': return 'accent-emerald'
    case 'deadline': return 'accent-red'
    case 'event': return 'accent-violet'
    case 'news': return 'accent-sky'
    default: return 'accent-slate'
  }
}

// ---------------------------------------------------------------------------
// Eligibility type badges (scholarships)
// ---------------------------------------------------------------------------

export function getEligibilityBadgeColor(type: string | null | undefined): string {
  if (!type) return 'badge-slate'
  const t = type.toLowerCase()
  if (t.includes('international') && t.includes('domestic')) return 'badge-blue'
  if (t.includes('international')) return 'badge-cyan'
  if (t.includes('domestic')) return 'badge-green'
  if (t.includes('worldwide')) return 'badge-purple'
  return 'badge-slate'
}
