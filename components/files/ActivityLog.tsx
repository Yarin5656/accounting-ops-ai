import type { ActivityEntry } from '@/lib/types'
import { FILE_STATUS_LABELS } from '@/lib/types'

function formatEvent(entry: ActivityEntry): string {
  const p = entry.payload
  switch (entry.event_type) {
    case 'file_created':
      return 'File opened'
    case 'status_change':
      return `Status: ${FILE_STATUS_LABELS[p.from as keyof typeof FILE_STATUS_LABELS] ?? p.from} → ${FILE_STATUS_LABELS[p.to as keyof typeof FILE_STATUS_LABELS] ?? p.to}`
    case 'document_received':
      return `Received: ${p.label}`
    case 'note_added':
      return `Note: "${p.preview}${p.preview?.length >= 60 ? '...' : ''}"`
    default:
      return entry.event_type.replace(/_/g, ' ')
  }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'today'
  if (days === 1) return '1d ago'
  return `${days}d ago`
}

export function ActivityLog({ entries }: { entries: ActivityEntry[] }) {
  const sorted = [...entries].reverse()
  return (
    <div>
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Activity</h2>
      <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
        {sorted.length === 0 ? (
          <div className="px-4 py-6 text-center text-slate-400 text-sm">No activity yet.</div>
        ) : (
          sorted.map((entry) => (
            <div key={entry.id} className="flex items-start justify-between px-4 py-2.5 gap-4">
              <span className="text-sm text-slate-700">{formatEvent(entry)}</span>
              <span className="text-xs text-slate-400 shrink-0">{timeAgo(entry.created_at)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
