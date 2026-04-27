import type { ServiceType } from './types'

export const DOCUMENT_TEMPLATES: Record<ServiceType, string[]> = {
  monthly_bookkeeping: [
    'Bank statements – all accounts',
    'Credit card statements',
    'Sales invoices',
    'Purchase invoices / receipts',
    'Payroll summary',
    'Cash receipts',
    'Expense reports',
  ],
  vat_reporting: [
    'Sales invoices for period',
    'Purchase invoices for period',
    'Import documents',
    'Export documents',
    'VAT exemption certificates (if applicable)',
    'Bank statements',
  ],
  annual_tax_return: [
    'Prior year tax return',
    'All monthly bookkeeping summaries',
    'Year-end bank statements',
    'Asset purchase/sale records',
    'Loan statements',
    'Depreciation schedule',
    'Director salary / dividend records',
    'Shareholder agreements (if changed)',
    'Corporate registration documents',
  ],
  company_reports: [
    'Year-end financial statements draft',
    'Management accounts',
    'Board resolutions',
    'Shareholder register',
    'Company incorporation documents',
    'Prior year report',
  ],
}
