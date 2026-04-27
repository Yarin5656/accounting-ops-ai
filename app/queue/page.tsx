import { supabase } from '@/lib/supabase'
import { PageShell } from '@/components/layout/PageShell'
import { FileTable } from '@/components/dashboard/FileTable'
import type { ClientFile, FileStatus } from '@/lib/types'

const TABS: { value: string; label: string }[] = [
  { value: 'all', label: 'כל הפתוחים' },
  { value: 'blocked', label: 'תקועים' },
  { value: 'waiting_for_client', label: 'ממתינים ללקוח' },
  { value: 'in_review', label: 'בבדיקה' },
]

async function getFiles(status?: string): Promise<ClientFile[]> {
  let query = supabase
    .from('client_files')
    .select('*, client:clients(id, name)')
    .order('updated_at', { ascending: true })
    .limit(100)

  if (status && status !== 'all') {
    query = query.eq('status', status as FileStatus)
  } else {
    query = query.neq('status', 'submitted')
  }

  const { data: files } = await query
  if (!files) return []

  const fileIds = files.map((f) => f.id)
  const { data: missing } = await supabase
    .from('document_items')
    .select('file_id')
    .in('file_id', fileIds)
    .eq('status', 'missing')

  const missingCount: Record<string, number> = {}
  for (const row of missing ?? []) {
    missingCount[row.file_id] = (missingCount[row.file_id] ?? 0) + 1
  }

  return files.map((f) => ({ ...f, missing_count: missingCount[f.id] ?? 0 }))
}

export default async function QueuePage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const active = status ?? 'all'
  const files = await getFiles(active)

  return (
    <PageShell title="תור משימות">
      <div className="flex gap-2 mb-5 flex-wrap">
        {TABS.map((tab) => (
          <a
            key={tab.value}
            href={tab.value === 'all' ? '/queue' : `/queue?status=${tab.value}`}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              active === tab.value
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>
      <FileTable files={files} />
    </PageShell>
  )
}
