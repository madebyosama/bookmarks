'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { User } from '@supabase/supabase-js'
import AuthModal from './AuthModal'
import { supabase } from './supabaseClient'

export type AuthMode = 'signup' | 'login'

type AuthContext = {
  user: User | null
  ready: boolean
  openAuth: (mode?: AuthMode, reason?: string) => void
  signOut: () => Promise<void>
  // Bookmark slugs, plus "collection:<slug>" / "post:<slug>" for saved collections and articles.
  saved: Set<string>
  savedReady: boolean
  toggleSave: (key: string) => Promise<void>
}

const Ctx = createContext<AuthContext | null>(null)

export const useAuth = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

export default function AuthProvider({ children, art }: { children: ReactNode; art: string[] }) {
  const [user, setUser] = useState<User | null>(null)
  const [ready, setReady] = useState(false)
  const [modal, setModal] = useState<{ mode: AuthMode; reason?: string } | null>(null)
  const [saved, setSaved] = useState<Set<string>>(new Set())
  const [savedReady, setSavedReady] = useState(false)

  useEffect(() => {
    if (!supabase) return setReady(true)
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setReady(true)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session) setModal(null)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    setSaved(new Set())
    setSavedReady(false)
    if (!supabase || !user) return setSavedReady(true)
    Promise.all([supabase.from('saves').select('bookmark_slug'), supabase.from('list_saves').select('kind, slug')]).then(([b, l]) => {
      setSaved(
        new Set([
          ...(b.data ?? []).map((r) => r.bookmark_slug as string),
          ...(l.data ?? []).map((r) => `${r.kind}:${r.slug}`), // empty until 0004_toolfolio.sql is run
        ])
      )
      setSavedReady(true)
    })
  }, [user])

  const openAuth = useCallback((mode: AuthMode = 'signup', reason?: string) => setModal({ mode, reason }), [])

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut()
  }, [])

  // Optimistic: flip locally, roll back if the write fails.
  const toggleSave = useCallback(
    async (key: string) => {
      if (!supabase || !user) return openAuth('signup', 'Create a free account to save bookmarks.')
      const had = saved.has(key)
      const flip = (on: boolean) =>
        setSaved((s) => {
          const n = new Set(s)
          if (on) n.add(key)
          else n.delete(key)
          return n
        })
      flip(!had)
      const [kind, slug] = key.includes(':') ? key.split(':') : ['bookmark', key]
      const { error } =
        kind === 'bookmark'
          ? had
            ? await supabase.from('saves').delete().eq('bookmark_slug', slug)
            : await supabase.from('saves').insert({ bookmark_slug: slug })
          : had
            ? await supabase.from('list_saves').delete().eq('kind', kind).eq('slug', slug)
            : await supabase.from('list_saves').insert({ kind, slug })
      if (error) flip(had)
    },
    [saved, user, openAuth]
  )

  const value = useMemo(
    () => ({ user, ready, openAuth, signOut, saved, savedReady, toggleSave }),
    [user, ready, openAuth, signOut, saved, savedReady, toggleSave]
  )

  return (
    <Ctx.Provider value={value}>
      {children}
      {modal && (
        <AuthModal
          mode={modal.mode}
          reason={modal.reason}
          art={art}
          onMode={(mode) => setModal({ mode })}
          onClose={() => setModal(null)}
        />
      )}
    </Ctx.Provider>
  )
}
