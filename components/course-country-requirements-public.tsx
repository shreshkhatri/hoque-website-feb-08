'use client'

import { useState, useEffect } from 'react'
import { Globe, CheckCircle, GraduationCap, FileText, ChevronDown } from 'lucide-react'

interface CountryRequirement {
  id: number
  country_id: number
  academic_requirements: string | null
  english_language_requirements: string | null
  other_requirements: string | null
  document_requirements: string | null
  additional_notes: string | null
  countries: {
    id: number
    name: string
    flag_emoji: string | null
  }
}

interface GlobalRequirements {
  entry_requirements?: string | null
  academic_requirements?: string | null
  english_language_requirements?: string | null
  other_requirements?: string | null
  document_requirements?: string | null
}

interface Props {
  courseId: number
  globalRequirements: GlobalRequirements
}

function RichContent({ content, className = '' }: { content: string; className?: string }) {
  const isHtml = /<[a-z][\s\S]*>/i.test(content)
  if (isHtml) {
    return (
      <div
        className={`rich-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    )
  }
  return (
    <div className={className}>
      {content.split('\n').map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) return null
        if (trimmed.startsWith('- ')) {
          return (
            <div key={i} className="flex items-start gap-2.5 text-muted-foreground leading-relaxed my-0.5">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
              <span>{trimmed.slice(2)}</span>
            </div>
          )
        }
        return <p key={i} className="text-muted-foreground leading-relaxed">{trimmed}</p>
      })}
    </div>
  )
}

function RequirementRow({
  icon,
  label,
  content,
  className = '',
}: {
  icon: React.ReactNode
  label: string
  content: string
  className?: string
}) {
  return (
    <div className={`py-5 ${className}`}>
      <div className="flex items-center gap-2.5 mb-3">
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-base font-semibold text-foreground">{label}</h3>
      </div>
      <div className="pl-[42px]">
        <RichContent content={content} className="text-sm" />
      </div>
    </div>
  )
}

export function CourseCountryRequirementsPublic({ courseId, globalRequirements }: Props) {
  const [overrides, setOverrides] = useState<CountryRequirement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`/api/courses/${courseId}/country-requirements`)
      .then((r) => r.json())
      .then((json) => setOverrides(json.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [courseId])

  const selected = overrides.find((o) => o.countries.id === selectedId) ?? null

  // Resolve the effective requirements: country override → fall back to global
  const effective = {
    entry_requirements: globalRequirements.entry_requirements,
    academic_requirements: selected?.academic_requirements ?? globalRequirements.academic_requirements,
    english_language_requirements: selected?.english_language_requirements ?? globalRequirements.english_language_requirements,
    other_requirements: selected?.other_requirements ?? globalRequirements.other_requirements,
    document_requirements: selected?.document_requirements ?? globalRequirements.document_requirements,
    additional_notes: selected?.additional_notes ?? null,
  }

  const hasAny =
    effective.entry_requirements ||
    effective.academic_requirements ||
    effective.english_language_requirements ||
    effective.other_requirements ||
    effective.document_requirements

  if (!hasAny && overrides.length === 0 && !loading) return null

  return (
    <section className="bg-card border border-border rounded-xl p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5">
          <CheckCircle size={22} className="text-primary" />
          Requirements
        </h2>

        {/* Country selector — only shown if there are overrides */}
        {!loading && overrides.length > 0 && (
          <div className="relative w-full sm:w-64">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <Globe size={14} className="text-primary shrink-0" />
                {selected ? (
                  <span className="truncate">
                    {selected.countries.flag_emoji && `${selected.countries.flag_emoji} `}
                    {selected.countries.name}
                  </span>
                ) : (
                  <span className="text-muted-foreground">View requirements for...</span>
                )}
              </div>
              <ChevronDown size={14} className={`text-muted-foreground shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <ul className="absolute z-20 mt-1 w-full bg-background border border-border rounded-lg shadow-lg max-h-56 overflow-y-auto">
                <li
                  onClick={() => { setSelectedId(null); setOpen(false) }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted transition-colors flex items-center gap-2 ${!selectedId ? 'bg-primary/5 text-primary font-medium' : 'text-foreground'}`}
                >
                  <Globe size={13} />
                  Global defaults
                </li>
                {overrides.map((o) => (
                  <li
                    key={o.countries.id}
                    onClick={() => { setSelectedId(o.countries.id); setOpen(false) }}
                    className={`px-3 py-2 text-sm cursor-pointer hover:bg-muted transition-colors flex items-center gap-2 ${selectedId === o.countries.id ? 'bg-primary/5 text-primary font-medium' : 'text-foreground'}`}
                  >
                    {o.countries.flag_emoji && <span>{o.countries.flag_emoji}</span>}
                    {o.countries.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Country context banner */}
      {selected && (
        <div className="mb-4 flex items-center gap-2 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-lg text-sm text-primary">
          <Globe size={14} />
          Showing requirements specific to{' '}
          <span className="font-semibold">
            {selected.countries.flag_emoji && `${selected.countries.flag_emoji} `}
            {selected.countries.name}
          </span>
          . Fields not overridden fall back to global defaults.
        </div>
      )}

      {/* Requirement fields */}
      <div className="space-y-0 divide-y divide-border">
        {effective.entry_requirements && (
          <RequirementRow
            icon={<CheckCircle size={16} className="text-primary" />}
            label="Entry Requirements"
            content={effective.entry_requirements}
            className="pb-5 first:pt-0"
          />
        )}
        {effective.academic_requirements && (
          <RequirementRow
            icon={<GraduationCap size={16} className="text-primary" />}
            label="Academic Requirements"
            content={effective.academic_requirements}
          />
        )}
        {effective.english_language_requirements && (
          <RequirementRow
            icon={<Globe size={16} className="text-accent" />}
            label="English Language Requirements"
            content={effective.english_language_requirements}
          />
        )}
        {effective.other_requirements && (
          <RequirementRow
            icon={<FileText size={16} className="text-muted-foreground" />}
            label="Other Requirements"
            content={effective.other_requirements}
          />
        )}
        {effective.document_requirements && (
          <RequirementRow
            icon={<FileText size={16} className="text-muted-foreground" />}
            label="Document Requirements"
            content={effective.document_requirements}
          />
        )}
        {effective.additional_notes && (
          <RequirementRow
            icon={<FileText size={16} className="text-muted-foreground" />}
            label="Additional Notes"
            content={effective.additional_notes}
          />
        )}
      </div>
    </section>
  )
}
