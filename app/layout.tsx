import type { Metadata } from 'next'
import { Heebo } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

const heebo = Heebo({ subsets: ['hebrew', 'latin'] })

export const metadata: Metadata = {
  title: 'AccountingOps AI',
  description: 'פלטפורמה תפעולית לפירמות ראיית חשבון',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${heebo.className} flex h-screen overflow-hidden bg-slate-50`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </body>
    </html>
  )
}
