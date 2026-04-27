'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { FILE_STATUS_LABELS, FILE_STATUS_COLORS, ALL_FILE_STATUSES, type FileStatus } from '@/lib/types'
import { ChevronDown } from 'lucide-react'

export function StatusDropdown({
  fileId,
  currentStatus,
}: {
  fileId: string
  currentStatus: FileStatus
}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function changeStatus(next: FileStatus) {
    if (next === currentStatus) { setOpen(false); return }
    setLoading(true)
    await supabase.from('client_files').update({ status: next }).eq('id', fileId)
    await supabase.from('activity_log').insert({
      file_id: fileId,
      event_type: 'status_change',
      payload: { from: currentStatus, to: next },
    })
    setLoading(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        disabled={loading}
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${FILE_STATUS_COLORS[currentStatus]}`}
      >
        {FILE_STATUS_LABELS[currentStatus]}
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 min-w-44">
          {ALL_FILE_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => changeStatus(s)}
              className={`w-full text-right px-3 py-1.5 text-xs hover:bg-slate-50 flex items-center gap-2 ${
                s === currentStatus ? 'font-semibold text-slate-900' : 'text-slate-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${FILE_STATUS_COLORS[s].split(' ')[0].replace('bg-', 'bg-')}`}
              />
              {FILE_STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
