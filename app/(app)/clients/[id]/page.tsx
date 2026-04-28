import { createServerSupabase } from '@/lib/supabase-server'
import { PageShell } from '@/components/layout/PageShell'
import { StatusBadge } from '@/components/files/StatusBadge'
import { NewFileModal } from '@/components/files/NewFileModal'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SERVICE_TYPE_LABELS } from '@/lib/types'

export default async function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerSupabase()

  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (!client) notFound()

  const { data: files } = await supabase
    .from('client_files')
    .select('*')
    .eq('client_id', id)
    .order('created_at', { ascending: false })

  return (
    <PageShell title={client.name} action={<NewFileModal clientId={client.id} />}>
      <div className="mb-6 bg-white rounded-lg border border-slate-200 px-5 py-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-slate-400 mb-1">איש קשר</div>
            <div className="text-slate-900">{client.contact_name ?? '—'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">אימייל</div>
            <div className="text-slate-900">{client.contact_email ?? '—'}</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 mb-1">טלפון</div>
            <div className="text-slate-900">{client.contact_phone ?? '—'}</div>
          </div>
        </div>
      </div>

      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">תיקים</h2>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {!files || files.length === 0 ? (
          <div className="px-6 py-10 text-center text-slate-400 text-sm">אין תיקים עדיין.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">שירות</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">תקופה</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">סטטוס</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link href={`/files/${file.id}`} className="hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded">
                      {SERVICE_TYPE_LABELS[file.service_type as keyof typeof SERVICE_TYPE_LABELS]}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{file.period_label}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={file.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </PageShell>
  )
}
