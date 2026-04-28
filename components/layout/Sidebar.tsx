'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, ListTodo, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const nav = [
  { href: '/dashboard', label: 'לוח בקרה', icon: LayoutDashboard },
  { href: '/clients', label: 'לקוחות', icon: Users },
  { href: '/queue', label: 'תור משימות', icon: ListTodo },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <aside className="w-56 shrink-0 h-screen bg-slate-900 flex flex-col">
      <div className="px-5 py-5 border-b border-slate-700">
        <span className="text-white font-semibold text-sm tracking-wide">AccountingOps</span>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1" aria-label="ניווט ראשי">
        {nav.map(({ href, label, icon: Icon }) => {
          const active =
            href === '/'
              ? pathname === '/'
              : pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                active
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-3 pb-4 border-t border-slate-700 pt-3">
        <button
          onClick={signOut}
          aria-label="יציאה מהמערכת"
          className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
        >
          <LogOut className="w-4 h-4 shrink-0" aria-hidden="true" />
          יציאה
        </button>
      </div>
    </aside>
  )
}
