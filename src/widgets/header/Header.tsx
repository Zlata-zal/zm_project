import React, { useState } from 'react'
import AuthModal, { type AuthUser } from '../auth/AuthModal'
import styles from './Header.module.scss'

interface HeaderProps {
  user: AuthUser | null
  onNavigate: (to: 'home' | 'test' | 'profile' | 'wardrobe') => void
  onAuthSuccess: (payload: { user: AuthUser; mode: 'login' | 'register' }) => void
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, onAuthSuccess }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  return (
    <>
      <header className={styles.appHeader}>
        <div className={styles.headerLeft}>
          <span className={styles.logoMark}>ZM</span>
        </div>
        <nav className={styles.headerNav}>
          <button className={styles.navButton} onClick={() => onNavigate('home')}>
            Главная
          </button>
          <button className={styles.navButton} onClick={() => onNavigate('test')}>
            Статьи
          </button>
          <button
            className={styles.navButton}
            onClick={() => {
              if (user) onNavigate('profile')
              else setIsAuthModalOpen(true)
            }}
          >
            Профиль
          </button>
          <button
            className={`${styles.navButton} ${styles.navPrimary}`}
            onClick={() => setIsAuthModalOpen(true)}
          >
            {user ? 'Profile' : 'Log in'}
          </button>
        </nav>
      </header>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={payload => {
          onAuthSuccess(payload)
          setIsAuthModalOpen(false)
        }}
      />
    </>
  )
}

export default Header
