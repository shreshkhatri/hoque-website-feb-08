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
  const l = level.toLowerCase().trim()

  // Exact canonical DB values
  if (l === 'bachelor')     return 'badge-blue'
  if (l === 'master')       return 'badge-indigo'
  if (l === 'phd')          return 'badge-amber'
  if (l === 'mba')          return 'badge-violet'
  if (l === 'mphil')        return 'badge-purple'
  if (l === 'foundation')   return 'badge-orange'
  if (l === 'diploma')      return 'badge-teal'
  if (l === 'hnd')          return 'badge-teal'
  if (l === 'hnc')          return 'badge-teal'
  if (l === 'certificate')  return 'badge-emerald'
  if (l === 'pgdip')        return 'badge-indigo'
  if (l === 'pgce')         return 'badge-indigo'
  if (l === 'doctoral')     return 'badge-amber'
  if (l === 'research')     return 'badge-rose'
  if (l === 'postgraduate') return 'badge-indigo'

  // Fuzzy fallback
  if (l.includes('bachelor') || l.includes('undergraduate')) return 'badge-blue'
  if (l.includes('master') || l.includes('msc'))             return 'badge-indigo'
  if (l.includes('phd') || l.includes('doctor'))             return 'badge-amber'
  if (l.includes('foundation'))                              return 'badge-orange'
  if (l.includes('diploma'))                                 return 'badge-teal'
  if (l.includes('certificate'))                             return 'badge-emerald'
  if (l.includes('research'))                                return 'badge-rose'

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
