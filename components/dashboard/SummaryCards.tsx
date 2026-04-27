import type { ClientFile, FileStatus } from '@/lib/types'

const CARDS: { status: FileStatus; label: string; accent: string }[] = [
  { status: 'blocked', label: 'תקועים', accent: 'border-r-red-500' },
  { status: 'waiting_for_client', label: 'ממתינים ללקוח', accent: 'border-r-amber-500' },
  { status: 'in_review', label: 'בבדיקה', accent: 'border-r-blue-500' },
  { status: 'ready', label: 'מוכנים', accent: 'border-r-green-500' },
]

export function SummaryCards({ files }: { files: ClientFile[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {CARDS.map(({ status, label, accent }) => {
        const count = files.filter((f) => f.status === status).length
        return (
          <div
            key={status}
            className={`bg-white rounded-lg border border-slate-200 border-r-4 ${accent} px-4 py-3`}
          >
            <div className="text-2xl font-bold text-slate-900">{count}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </div>
        )
      })}
    </div>
  )
}
