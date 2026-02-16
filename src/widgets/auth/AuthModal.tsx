import React, { useState } from 'react'
import styles from './AuthModal.module.scss'

export interface AuthUser {
  name?: string
  email: string
}

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess: (payload: { user: AuthUser; mode: 'login' | 'register' }) => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const user: AuthUser = {
      email: formData.email.trim(),
      name: formData.name.trim() || undefined,
    }

    onAuthSuccess({ user, mode: isLogin ? 'login' : 'register' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>{isLogin ? 'Log in' : 'Sign up'}</h2>
          <p className={styles.subtitle}>
            {isLogin
              ? 'Welcome back! Please enter your details.'
              : 'Create an account to get started.'}
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isLogin && (
            <div className={styles.forgotPassword}>
              <a href="#" className={styles.forgotLink}>
                Forgot password?
              </a>
            </div>
          )}

          <button type="submit" className={styles.submitButton}>
            {isLogin ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <div className={styles.switch}>
          <span className={styles.switchText}>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button
            type="button"
            className={styles.switchButton}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
