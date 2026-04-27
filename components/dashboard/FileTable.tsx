import Link from 'next/link'
import type { ClientFile } from '@/lib/types'
import { SERVICE_TYPE_LABELS } from '@/lib/types'
import { StatusBadge } from '@/components/files/StatusBadge'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'היום'
  if (days === 1) return 'אתמול'
  return `לפני ${days} ימים`
}

export function FileTable({ files }: { files: ClientFile[] }) {
  if (files.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 px-6 py-12 text-center text-slate-400 text-sm">
        אין תיקים פתוחים.
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">לקוח</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">שירות</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">תקופה</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">סטטוס</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">חסרים</th>
            <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">עודכן</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {files.map((file) => (
            <tr key={file.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 font-medium text-slate-900">
                <Link href={`/files/${file.id}`} className="hover:text-blue-600">
                  {file.client?.name ?? '—'}
                </Link>
              </td>
              <td className="px-4 py-3 text-slate-600">{SERVICE_TYPE_LABELS[file.service_type]}</td>
              <td className="px-4 py-3 text-slate-600">{file.period_label}</td>
              <td className="px-4 py-3">
                <StatusBadge status={file.status} />
              </td>
              <td className="px-4 py-3">
                {(file.missing_count ?? 0) > 0 ? (
                  <span className="text-red-600 font-medium">{file.missing_count} חסרים</span>
                ) : (
                  <span className="text-slate-300">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-slate-400 text-xs">{timeAgo(file.updated_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
