'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError('אירעה שגיאה, נסה שוב')
      setLoading(false)
      return
    }

    setDone(true)
  }

  if (done) {
    return (
      <div className="w-full max-w-sm text-center">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">בדוק את האימייל שלך</h2>
          <p className="text-sm text-slate-500">
            שלחנו קישור לאיפוס סיסמה לכתובת <strong>{email}</strong>
          </p>
          <Link
            href="/auth/login"
            className="mt-4 inline-block text-sm text-blue-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded"
          >
            חזרה לכניסה
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">שכחת סיסמה?</h1>
        <p className="text-sm text-slate-500 mt-1">נשלח לך קישור לאיפוס</p>
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

          {error && (
            <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full text-sm font-medium bg-slate-900 text-white py-2 rounded-md hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            {loading ? 'שולח...' : 'שלח קישור לאיפוס'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          <Link href="/auth/login" className="text-blue-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded">
            חזרה לכניסה
          </Link>
        </p>
      </div>
    </div>
  )
}
