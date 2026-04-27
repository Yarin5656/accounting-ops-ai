import { supabase } from '@/lib/supabase'
import { PageShell } from '@/components/layout/PageShell'
import { StatusDropdown } from '@/components/files/StatusDropdown'
import { DocumentChecklist } from '@/components/files/DocumentChecklist'
import { NotesPanel } from '@/components/files/NotesPanel'
import { ActivityLog } from '@/components/files/ActivityLog'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SERVICE_TYPE_LABELS } from '@/lib/types'

export default async function FileDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [{ data: file }, { data: docs }, { data: notes }, { data: activity }] = await Promise.all([
    supabase.from('client_files').select('*, client:clients(id, name)').eq('id', id).single(),
    supabase.from('document_items').select('*').eq('file_id', id).order('sort_order'),
    supabase.from('notes').select('*').eq('file_id', id).order('created_at'),
    supabase.from('activity_log').select('*').eq('file_id', id).order('created_at'),
  ])

  if (!file) notFound()

  const client = file.client as { id: string; name: string } | null
  const serviceLabel = SERVICE_TYPE_LABELS[file.service_type as keyof typeof SERVICE_TYPE_LABELS]

  return (
    <PageShell title={`${client?.name ?? '—'} — ${serviceLabel}`}>
      <div className="mb-1 text-sm text-slate-500">
        <Link href={`/clients/${file.client_id}`} className="hover:text-blue-600">
          {client?.name}
        </Link>
        {' / '}
        <span>{file.period_label}</span>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <StatusDropdown fileId={file.id} currentStatus={file.status} />
        {file.reminder_date && (
          <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            תזכורת: {file.reminder_date}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DocumentChecklist items={docs ?? []} />
          <NotesPanel fileId={file.id} notes={notes ?? []} />
        </div>
        <div>
          <ActivityLog entries={activity ?? []} />
        </div>
      </div>
    </PageShell>
  )
}
