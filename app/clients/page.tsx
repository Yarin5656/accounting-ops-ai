import { supabase } from '@/lib/supabase'
import { PageShell } from '@/components/layout/PageShell'
import Link from 'next/link'
import type { Client } from '@/lib/types'

async function getClients(): Promise<(Client & { file_count: number })[]> {
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('name', { ascending: true })
    .limit(100)

  if (!clients) return []

  const { data: fileCounts } = await supabase
    .from('client_files')
    .select('client_id')
    .neq('status', 'submitted')

  const countByClient: Record<string, number> = {}
  for (const f of fileCounts ?? []) {
    countByClient[f.client_id] = (countByClient[f.client_id] ?? 0) + 1
  }

  return clients.map((c) => ({ ...c, file_count: countByClient[c.id] ?? 0 }))
}

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <PageShell title="Clients">
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {clients.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400 text-sm">No clients yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Open Files</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    <Link href={`/clients/${client.id}`} className="hover:text-blue-600">
                      {client.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{client.contact_name ?? '—'}</td>
                  <td className="px-4 py-3 text-slate-500">{client.contact_email ?? '—'}</td>
                  <td className="px-4 py-3">
                    {client.file_count > 0 ? (
                      <span className="text-blue-600 font-medium">{client.file_count}</span>
                    ) : (
                      <span className="text-slate-300">0</span>
                    )}
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
