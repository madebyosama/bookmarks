'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './Auth.module.css'
import Icon from '../Icon/Icon'
import type { AuthMode } from './AuthProvider'
import { supabase } from './supabaseClient'

const perks = ['Save bookmarks', 'One saved list', 'Synced on every device', 'Free forever']

export default function AuthModal({
  mode,
  reason,
  art,
  onMode,
  onClose,
}: {
  mode: AuthMode
  reason?: string
  art: string[]
  onMode: (m: AuthMode) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [emailOpen, setEmailOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<{ kind: 'idle' | 'busy' | 'sent' | 'error'; text?: string }>({ kind: 'idle' })

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  const redirectTo = typeof window === 'undefined' ? undefined : window.location.href

  const oauth = async (provider: 'google' | 'github') => {
    if (!supabase) return setStatus({ kind: 'error', text: 'Sign-in isn’t configured yet.' })
    setStatus({ kind: 'busy' })
    const { error } = await supabase.auth.signInWithOAuth({ provider, options: { redirectTo } })
    if (error) setStatus({ kind: 'error', text: error.message })
  }

  const magicLink = async (e: FormEvent) => {
    e.preventDefault()
    if (!supabase) return setStatus({ kind: 'error', text: 'Sign-in isn’t configured yet.' })
    setStatus({ kind: 'busy' })
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: mode === 'signup' },
    })
    setStatus(error ? { kind: 'error', text: error.message } : { kind: 'sent' })
  }

  const signup = mode === 'signup'

  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby='auth-title'
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
    >
      <div className={styles.panel}>
        <div className={styles.art} aria-hidden='true'>
          {art.slice(0, 6).map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt='' className={styles.artImg} />
          ))}
        </div>

        <div className={styles.body}>
          <button type='button' className={styles.close} onClick={() => ref.current?.close()} aria-label='Close'>
            <Icon name='close' />
          </button>

          <h2 id='auth-title' className={styles.title}>
            {signup ? (
              <>
                Keep the sites <strong>worth keeping.</strong>
              </>
            ) : (
              <>
                Welcome <strong>back.</strong>
              </>
            )}
          </h2>
          {reason && <p className={styles.reason}>{reason}</p>}

          <ul className={styles.perks}>
            {perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className={styles.divider}>
            <span>{signup ? 'Create a free account' : 'Sign in to your account'}</span>
          </div>

          {status.kind === 'sent' ? (
            <p className={styles.sent} role='status'>
              Check <strong>{email}</strong> — we sent you a sign-in link.
            </p>
          ) : (
            <>
              <div className={styles.providers}>
                <button type='button' className={styles.google} onClick={() => oauth('google')} disabled={status.kind === 'busy'}>
                  <svg aria-hidden='true' width='18' height='18' viewBox='0 0 24 24'>
                    <path fill='#4285F4' d='M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z' />
                    <path fill='#34A853' d='M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z' />
                    <path fill='#FBBC05' d='M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8z' />
                    <path fill='#EA4335' d='M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z' />
                  </svg>
                  Google
                </button>
                <button type='button' className={styles.github} onClick={() => oauth('github')} disabled={status.kind === 'busy'}>
                  <svg aria-hidden='true' width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z' />
                  </svg>
                  GitHub
                </button>
              </div>

              {emailOpen ? (
                <form onSubmit={magicLink} className={styles.emailForm}>
                  <label htmlFor='auth-email' className='sr-only'>
                    Email
                  </label>
                  <input
                    id='auth-email'
                    type='email'
                    required
                    autoFocus
                    autoComplete='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.emailInput}
                  />
                  <button type='submit' className={styles.emailSubmit} disabled={status.kind === 'busy'}>
                    {status.kind === 'busy' ? 'Sending…' : 'Send link'}
                  </button>
                </form>
              ) : (
                <button type='button' className={styles.textButton} onClick={() => setEmailOpen(true)}>
                  Continue with email <Icon name='chevronRight' size={14} />
                </button>
              )}
            </>
          )}

          {status.kind === 'error' && (
            <p className={styles.error} role='alert'>
              {status.text}
            </p>
          )}

          <p className={styles.switch}>
            {signup ? 'Already have an account?' : 'New here?'}{' '}
            <button type='button' onClick={() => onMode(signup ? 'login' : 'signup')}>
              {signup ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </div>
      </div>
    </dialog>
  )
}
