import React, { useState } from 'react'
import styles from './AuthModal.module.scss'
import { register, login } from '../../services/auth'
import type { AuthUser } from '../../services/auth'

export type { AuthUser }

export interface BodyParams {
  heightCm?: number
  shouldersCm?: number
  waistCm?: number
  hipsCm?: number
  shape?: string
}


interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (data: { user: AuthUser; mode: 'login' | 'register' }) => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async () => {
  setError(null)
  setIsLoading(true)

  try {
    const user = mode === 'register'
      ? await register(email, password, name)
      : await login(email, password)

    onSuccess({ user, mode })
    onClose()
  } catch (err: any) {
    setError(err.message || 'Что-то пошло не так')
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <svg viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.header}>
          <h2 className={styles.logo}>ZM</h2>
          <p className={styles.logoMeta}>— style code · 2026 —</p>
        </div>

        <div className={styles.tabs}>
          <span
            className={`${styles.tabIndicator} ${
              mode === 'register' ? styles.tabIndicatorRight : ''
            }`}
          />
          <span
            className={`${styles.tab} ${mode === 'login' ? styles.tabActive : ''}`}
            onClick={() => setMode('login')}
          >
            войти
          </span>
          <span
            className={`${styles.tab} ${mode === 'register' ? styles.tabActive : ''}`}
            onClick={() => setMode('register')}
          >
            регистрация
          </span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className={styles.field}>
              <span className={styles.label}>— имя —</span>
              <input
                className={styles.input}
                type="text"
                placeholder="как тебя зовут"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className={styles.field}>
            <span className={styles.label}>— email —</span>
            <input
              className={styles.input}
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <span className={styles.label}>— пароль —</span>
            <input
              className={styles.input}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === 'login' && (
            <div className={styles.forgotPassword}>
              <button type="button" className={styles.forgotLink}>
                забыли пароль?
              </button>
            </div>
          )}

          {error && (
            <p className={styles.errorMessage}>{error}</p>
          )}

      <button
        type="button"
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={isLoading || !email || !password}
      >
        {isLoading
          ? 'Подождите...'
          : (mode === 'register' ? 'Создать аккаунт' : 'Войти')}
        </button>
        </form>
      </div>
    </div>
  )
}

export default AuthModal