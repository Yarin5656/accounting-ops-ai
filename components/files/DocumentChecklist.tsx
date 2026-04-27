'use client'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { DocumentItem, DocumentStatus } from '@/lib/types'

const STATUS_CYCLE: Record<DocumentStatus, DocumentStatus> = {
  missing: 'received',
  received: 'not_required',
  not_required: 'missing',
}

const STATUS_STYLE: Record<DocumentStatus, string> = {
  missing: 'text-red-600 bg-red-50 border-red-200',
  received: 'text-green-700 bg-green-50 border-green-200',
  not_required: 'text-slate-400 bg-slate-50 border-slate-200',
}

const STATUS_LABEL: Record<DocumentStatus, string> = {
  missing: 'Missing',
  received: 'Received',
  not_required: 'N/A',
}

export function DocumentChecklist({ items }: { items: DocumentItem[] }) {
  const router = useRouter()
  const missingCount = items.filter((i) => i.status === 'missing').length

  async function toggleStatus(item: DocumentItem) {
    const next = STATUS_CYCLE[item.status]
    await supabase.from('document_items').update({ status: next }).eq('id', item.id)
    if (next === 'received') {
      await supabase.from('activity_log').insert({
        file_id: item.file_id,
        event_type: 'document_received',
        payload: { label: item.label },
      })
    }
    router.refresh()
  }

  const sorted = [...items].sort((a, b) => {
    const order: Record<DocumentStatus, number> = { missing: 0, received: 1, not_required: 2 }
    return order[a.status] - order[b.status] || a.sort_order - b.sort_order
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Documents</h2>
        {missingCount > 0 && (
          <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            {missingCount} missing
          </span>
        )}
      </div>
      <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
        {items.length === 0 && (
          <div className="px-4 py-8 text-center text-slate-400 text-sm">No documents.</div>
        )}
        {sorted.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-4 py-2.5">
            <span
              className={`text-sm ${item.status === 'not_required' ? 'text-slate-400 line-through' : 'text-slate-800'}`}
            >
              {item.label}
            </span>
            <button
              onClick={() => toggleStatus(item)}
              className={`text-xs font-medium px-2 py-0.5 rounded border cursor-pointer transition-colors shrink-0 ml-4 ${STATUS_STYLE[item.status]}`}
            >
              {STATUS_LABEL[item.status]}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
