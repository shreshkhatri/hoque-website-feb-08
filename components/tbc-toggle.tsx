'use client'

import { HelpCircle, X } from 'lucide-react'

interface TbcToggleProps {
  field: string
  tbcFields: string[]
  onChange: (fields: string[]) => void
}

/**
 * A small toggle that marks a field as "To Be Confirmed (TBC)".
 * When active, the field value is considered provisional and a TBC badge
 * will be displayed on the public-facing course page.
 */
export function TbcToggle({ field, tbcFields, onChange }: TbcToggleProps) {
  const isActive = tbcFields.includes(field)

  const toggle = () => {
    if (isActive) {
      onChange(tbcFields.filter((f) => f !== field))
    } else {
      onChange([...tbcFields, field])
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={isActive ? 'Remove TBC — value is confirmed' : 'Mark as TBC — value is not yet confirmed'}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border transition-all shrink-0 ${
        isActive
          ? 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
          : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50'
      }`}
    >
      {isActive ? (
        <>
          <span>TBC</span>
          <X className="h-3 w-3" />
        </>
      ) : (
        <>
          <HelpCircle className="h-3 w-3" />
          <span>TBC</span>
        </>
      )}
    </button>
  )
}
