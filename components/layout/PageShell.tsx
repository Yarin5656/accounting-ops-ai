interface PageShellProps {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

export function PageShell({ title, action, children }: PageShellProps) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
        <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        {action && <div>{action}</div>}
      </header>
      <main className="flex-1 px-8 py-6">{children}</main>
    </div>
  )
}
