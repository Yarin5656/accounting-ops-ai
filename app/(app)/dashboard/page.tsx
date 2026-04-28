import { createServerSupabase } from '@/lib/supabase-server'
import { PageShell } from '@/components/layout/PageShell'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { FileTable } from '@/components/dashboard/FileTable'
import type { ClientFile } from '@/lib/types'

async function getOpenFiles(): Promise<ClientFile[]> {
  const supabase = await createServerSupabase()

  const { data: files } = await supabase
    .from('client_files')
    .select('*, client:clients(id, name)')
    .neq('status', 'submitted')
    .order('updated_at', { ascending: true })
    .limit(100)

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

export default async function DashboardPage() {
  const files = await getOpenFiles()

  return (
    <PageShell title="לוח בקרה">
      <SummaryCards files={files} />
      <FileTable files={files} />
    </PageShell>
  )
}
