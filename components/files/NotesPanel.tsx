'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Note } from '@/lib/types'

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${Math.max(1, mins)}m ago`
  const hours = Math.floor(diff / 3600000)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}

export function NotesPanel({ fileId, notes }: { fileId: string; notes: Note[] }) {
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  async function addNote() {
    if (!body.trim()) return
    setSaving(true)
    await supabase.from('notes').insert({ file_id: fileId, body: body.trim() })
    await supabase.from('activity_log').insert({
      file_id: fileId,
      event_type: 'note_added',
      payload: { preview: body.trim().slice(0, 60) },
    })
    setBody('')
    setSaving(false)
    router.refresh()
  }

  return (
    <div>
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Notes</h2>
      <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add an internal note..."
          rows={3}
          className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          onClick={addNote}
          disabled={!body.trim() || saving}
          className="text-sm font-medium bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Saving...' : 'Add Note'}
        </button>
        {notes.length > 0 && (
          <div className="border-t border-slate-100 pt-4 space-y-3">
            {[...notes].reverse().map((note) => (
              <div key={note.id}>
                <p className="text-sm text-slate-800 whitespace-pre-wrap">{note.body}</p>
                <p className="text-xs text-slate-400 mt-1">{timeAgo(note.created_at)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
