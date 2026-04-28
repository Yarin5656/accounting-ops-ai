'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('אימייל או סיסמה שגויים')
      setLoading(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">AccountingOps</h1>
        <p className="text-sm text-slate-500 mt-1">כניסה לחשבון</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              אימייל
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                סיסמה
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-blue-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded"
              >
                שכחת סיסמה?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              aria-required="true"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full text-sm font-medium bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {loading ? 'מתחבר...' : 'כניסה'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          אין לך חשבון?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded">
            הרשמה
          </Link>
        </p>
      </div>
    </div>
  )
}
