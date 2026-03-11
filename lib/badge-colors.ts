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
  if (!level) return 'badge-slate'
  const l = level.toLowerCase()

  if (l.includes('undergraduate') || l.includes('bachelor'))
    return 'badge-blue'   // Blue — undergraduate / bachelor's
  if (l.includes('master') || l.includes('postgraduate') || l.includes('msc') || l.includes('mba'))
    return 'badge-indigo' // Indigo — master's / postgraduate
  if (l.includes('phd') || l.includes('doctor') || l.includes('doctoral'))
    return 'badge-amber'  // Amber — PhD / doctoral
  if (l.includes('foundation'))
    return 'badge-orange' // Orange — foundation year
  if (l.includes('diploma'))
    return 'badge-teal'   // Teal — diploma
  if (l.includes('certificate'))
    return 'badge-emerald' // Emerald — certificate
  if (l.includes('research'))
    return 'badge-rose'   // Rose — research
  if (l.includes('pre'))
    return 'badge-purple' // Purple — pre-master / pre-sessional
  return 'badge-slate'
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
    case 'deadline':    return 'badge-red'     // Red — urgency / time limit
    case 'event':       return 'badge-violet'  // Violet — event / gathering
    case 'news':        return 'badge-sky'     // Sky — informational / news
    default:            return 'badge-slate'   // Slate — neutral / general
  }
}

/**
 * Top accent-line colour for announcement cards (solid bg colour).
 */
export function getAnnouncementTypeAccentBar(type: string | null | undefined): string {
  switch (type) {
    case 'scholarship': return 'accent-emerald'
    case 'deadline':    return 'accent-red'
    case 'event':       return 'accent-violet'
    case 'news':        return 'accent-sky'
    default:            return 'accent-slate'
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
  if (t.includes('domestic'))      return 'badge-green'
  if (t.includes('worldwide'))     return 'badge-purple'
  return 'badge-slate'
}
