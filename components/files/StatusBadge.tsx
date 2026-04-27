import { FILE_STATUS_COLORS, FILE_STATUS_LABELS, type FileStatus } from '@/lib/types'

export function StatusBadge({ status }: { status: FileStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${FILE_STATUS_COLORS[status]}`}
    >
      {FILE_STATUS_LABELS[status]}
    </span>
  )
}
