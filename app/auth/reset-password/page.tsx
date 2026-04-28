'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('הסיסמה חייבת להכיל לפחות 8 תווים')
      return
    }
    if (password !== confirm) {
      setError('הסיסמאות אינן תואמות')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('אירעה שגיאה, נסה שוב')
      setLoading(false)
      return
    }

    setDone(true)
    setTimeout(() => router.push('/'), 2000)
  }

  if (done) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">הסיסמה עודכנה</h2>
          <p className="text-sm text-slate-500">מועבר לדשבורד...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">איפוס סיסמה</h1>
        <p className="text-sm text-slate-500 mt-1">הזן סיסמה חדשה</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
              סיסמה חדשה <span className="text-slate-400 font-normal">(לפחות 8 תווים)</span>
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              aria-required="true"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 mb-1">
              אימות סיסמה
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              aria-required="true"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
            disabled={loading || !password || !confirm}
            className="w-full text-sm font-medium bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {loading ? 'מעדכן...' : 'עדכון סיסמה'}
          </button>
        </form>
      </div>
    </div>
  )
}
