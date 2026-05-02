import React, { useEffect, useState } from 'react'
import Layout from '../widgets/Layout'
import TestPage from '../pages/test/TestPage'
import Profile from '../pages/account/Profile'
import WardrobePage from '../pages/wardrobe/WardrobePage'
import { type AuthUser } from '../widgets/auth/AuthModal'
import type { KibbeResult } from '../pages/test/types'
import HomePage from './home/HomePage'

const App: React.FC = () => {
  const [isTestOpen, setIsTestOpen] = useState(false)
  const [activeView, setActiveView] = useState<'home' | 'test' | 'profile' | 'wardrobe'>('home')
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

    setActiveView('profile')
    setIsTestOpen(false)
  }

 
  const handleTestFinish = (result: KibbeResult) => {
    console.log('App: получен результат теста', result)

    // Если пользователь не авторизован — сохраним результат во временное хранилище
    if (!user) {
      try {
        localStorage.setItem('zm_pending_result', JSON.stringify(result))
      } catch { /* ignore */ }
      
      setActiveView('home')
      setIsTestOpen(false)
      return
    }

    // Сохраняем результат в user
    const updated: AuthUser = { ...user, kibbeResult: result }
    setUser(updated)
    try {
      localStorage.setItem('zm_user', JSON.stringify(updated))
    } catch { /* ignore */ }

    // Переходим в профиль
    setActiveView('profile')
    setIsTestOpen(false)
  }

  const navigate = (to: 'home' | 'test' | 'profile' | 'wardrobe') => {
    setActiveView(to)
    setIsTestOpen(to === 'test')
  }
 // === ТЕСТ ===
  if (activeView === 'test' || isTestOpen) {
    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        <TestPage
          onBack={() => {
            setIsTestOpen(false)
            setActiveView('home')
          }}
          onFinish={handleTestFinish}     
        />
      </Layout>
    )
  }

  
  if (activeView === 'profile') {
    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        {user ? (
          <Profile
            user={user}
            onLogout={() => {
              setUser(null)
              try {
                localStorage.removeItem('zm_user')
              } catch { /* ignore */ }
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
            onFinish={handleTestFinish}    
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
          onBack={() => setActiveView('profile')}
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
