export type ServiceType =
  | 'monthly_bookkeeping'
  | 'vat_reporting'
  | 'annual_tax_return'
  | 'company_reports'

export type FileStatus =
  | 'new'
  | 'waiting_for_client'
  | 'in_review'
  | 'ready'
  | 'submitted'
  | 'blocked'

export type DocumentStatus = 'missing' | 'received' | 'not_required'

export interface Client {
  id: string
  name: string
  contact_name: string | null
  contact_email: string | null
  contact_phone: string | null
  created_at: string
  updated_at: string
}

export interface ClientFile {
  id: string
  client_id: string
  service_type: ServiceType
  period_label: string
  status: FileStatus
  reminder_date: string | null
  created_at: string
  updated_at: string
  client?: Pick<Client, 'id' | 'name'>
  missing_count?: number
}

export interface DocumentItem {
  id: string
  file_id: string
  label: string
  status: DocumentStatus
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Note {
  id: string
  file_id: string
  body: string
  created_at: string
}

export interface ActivityEntry {
  id: string
  file_id: string
  event_type: string
  payload: Record<string, string>
  created_at: string
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  monthly_bookkeeping: 'Monthly Bookkeeping',
  vat_reporting: 'VAT Reporting',
  annual_tax_return: 'Annual Tax Return',
  company_reports: 'Company Reports',
}

export const FILE_STATUS_LABELS: Record<FileStatus, string> = {
  new: 'New',
  waiting_for_client: 'Waiting for Client',
  in_review: 'In Review',
  ready: 'Ready',
  submitted: 'Submitted',
  blocked: 'Blocked',
}

export const FILE_STATUS_COLORS: Record<FileStatus, string> = {
  new: 'bg-slate-100 text-slate-700',
  waiting_for_client: 'bg-amber-100 text-amber-700',
  in_review: 'bg-blue-100 text-blue-700',
  ready: 'bg-green-100 text-green-700',
  submitted: 'bg-emerald-100 text-emerald-700',
  blocked: 'bg-red-100 text-red-700',
}

export const ALL_FILE_STATUSES: FileStatus[] = [
  'new',
  'waiting_for_client',
  'in_review',
  'ready',
  'submitted',
  'blocked',
]
