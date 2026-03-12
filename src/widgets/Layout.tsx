import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import styles from './Layout.module.scss'
import { type AuthUser } from './auth/AuthModal'

interface LayoutProps {
  children: React.ReactNode
  user: AuthUser | null
  onNavigate: (to: 'home' | 'test' | 'account' | 'wardrobe') => void
  onAuthSuccess: (payload: { user: AuthUser; mode: 'login' | 'register' }) => void
}

const Layout: React.FC<LayoutProps> = ({ children, user, onNavigate, onAuthSuccess }) => {
  return (
    <div className={styles.app}>
      <Header user={user} onNavigate={onNavigate} onAuthSuccess={onAuthSuccess} />
      <main className={styles.appMain}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout