'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { DOCUMENT_TEMPLATES } from '@/lib/document-templates'
import { SERVICE_TYPE_LABELS, type ServiceType } from '@/lib/types'

const SERVICE_TYPES = Object.keys(SERVICE_TYPE_LABELS) as ServiceType[]

export function NewFileModal({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false)
  const [serviceType, setServiceType] = useState<ServiceType>('monthly_bookkeeping')
  const [periodLabel, setPeriodLabel] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function createFile() {
    if (!periodLabel.trim()) return
    setSaving(true)

    const { data: file, error } = await supabase
      .from('client_files')
      .insert({
        client_id: clientId,
        service_type: serviceType,
        period_label: periodLabel.trim(),
        status: 'new',
      })
      .select()
      .single()

    if (error || !file) { setSaving(false); return }

    const templates = DOCUMENT_TEMPLATES[serviceType]
    await supabase.from('document_items').insert(
      templates.map((label, i) => ({
        file_id: file.id,
        label,
        status: 'missing' as const,
        sort_order: i + 1,
      }))
    )
    await supabase.from('activity_log').insert({
      file_id: file.id,
      event_type: 'file_created',
      payload: {},
    })

    setSaving(false)
    setOpen(false)
    setPeriodLabel('')
    router.push(`/files/${file.id}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-700 transition-colors"
      >
        + New File
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <h2 className="text-base font-semibold text-slate-900 mb-4">New File</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Service Type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{SERVICE_TYPE_LABELS[s]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Period</label>
                <input
                  type="text"
                  value={periodLabel}
                  onChange={(e) => setPeriodLabel(e.target.value)}
                  placeholder="e.g. March 2025 or Q1 2025"
                  className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 text-sm font-medium text-slate-600 border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createFile}
                disabled={!periodLabel.trim() || saving}
                className="flex-1 text-sm font-medium bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
