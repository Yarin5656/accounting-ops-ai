import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AccountingOps AI',
  description: 'Internal operations platform for accounting firms',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen overflow-hidden bg-slate-50`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">{children}</div>
      </body>
    </html>
  )
}
