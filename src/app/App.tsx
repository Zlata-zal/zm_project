import React, { useEffect, useState } from 'react'
import Layout from '../widgets/Layout'
import TestPage from '../pages/test/TestPage'
import AccountPage from '../pages/account/AccountPage'
import WardrobePage from '../pages/wardrobe/WardrobePage'
import { type AuthUser, type BodyParams } from '../widgets/auth/AuthModal'
import HomePage from './home/HomePage'

const App: React.FC = () => {
  const [isTestOpen, setIsTestOpen] = useState(false)
  const [activeView, setActiveView] = useState<'home' | 'test' | 'account' | 'wardrobe'>('home')
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('zm_user')
      if (raw) setUser(JSON.parse(raw) as AuthUser)
    } catch {
      // ignore
    }
  }, [])

  const handleAuthSuccess = ({
    user: nextUser,
    mode,
  }: {
    user: AuthUser
    mode: 'login' | 'register'
  }) => {
    setUser(nextUser)
    try {
      localStorage.setItem('zm_user', JSON.stringify(nextUser))
    } catch {
      // ignore
    }

    if (mode === 'register') {
      setActiveView('account')
      setIsTestOpen(false)
    }
  }

  const navigate = (to: 'home' | 'test' | 'account' | 'wardrobe') => {
    setActiveView(to)
    setIsTestOpen(to === 'test')
  }

  if (activeView === 'test' || isTestOpen) {
    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        <TestPage
          onBack={() => {
            setIsTestOpen(false)
            setActiveView('home')
          }}
          onBodySubmit={(body: BodyParams) => {
            if (!user) return
            const updated: AuthUser = { ...user, body }
            setUser(updated)
            try {
              localStorage.setItem('zm_user', JSON.stringify(updated))
            } catch {
              // ignore
            }
            setActiveView('account')
            setIsTestOpen(false)
          }}
        />
      </Layout>
    )
  }

  if (activeView === 'account') {
    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        {user ? (
          <AccountPage
            user={user}
            onLogout={() => {
              setUser(null)
              try {
                localStorage.removeItem('zm_user')
              } catch {
                // ignore
              }
              setActiveView('home')
            }}
            onOpenWardrobe={() => setActiveView('wardrobe')}
            onRefine={() => {
              setActiveView('test')
              setIsTestOpen(true)
            }}
          />
        ) : (
          <TestPage
            onBack={() => {
              setActiveView('home')
            }}
            onBodySubmit={(body: BodyParams) => {
              if (!user) return
              const updated: AuthUser = { ...user, body }
              setUser(updated)
              try {
                localStorage.setItem('zm_user', JSON.stringify(updated))
              } catch {
                // ignore
              }
              setActiveView('account')
            }}
          />
        )}
      </Layout>
    )
  }

  if (activeView === 'wardrobe') {
    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        <WardrobePage
          user={user}
          onBack={() => setActiveView('account')}
          onMoreQuestions={() => {
            setActiveView('test')
            setIsTestOpen(true)
          }}
        />
      </Layout>
    )
  }

  return (
    <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
      <HomePage onStartTest={() => setIsTestOpen(true)} />
    </Layout>
  )
}

export default App
