
import React, { useEffect, useState } from 'react'
import Layout from '../widgets/Layout'
import TestPage from '../pages/test/TestPage'
import Profile from '../pages/account/Profile'
import WardrobePage from '../pages/wardrobe/WardrobePage'
import { type AuthUser } from '../widgets/auth/AuthModal'
import type { KibbeResult } from '../pages/test/types'
import HomePage from './home/HomePage'
import ArticlesPage from '../pages/article/ArticlesPage'
import ArticlePage from '../pages/article/ArticlePage'
import { fullArticles } from '../pages/article/ArticleData'
import { getCurrentUser, logout, saveTestResult } from '../services/auth'


type ActiveView = 'home' | 'test' | 'profile' | 'wardrobe' | 'articles' | 'article'

const App: React.FC = () => {
  const [isTestOpen, setIsTestOpen] = useState(false)
  const [activeView, setActiveView] = useState<ActiveView>('home')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [currentArticleId, setCurrentArticleId] = useState<string | null>(null)

  useEffect(() => {
  const loadUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
      }
    } catch (err) {
      console.error('Не удалось загрузить пользователя:', err)
    }
  }
  loadUser()
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

  const handleTestFinish = async (result: KibbeResult) => {
  console.log('App: получен результат теста', result)

  if (!user) {
    try {
      localStorage.setItem('zm_pending_result', JSON.stringify(result))
    } catch { /* ignore */ }

    setActiveView('home')
    setIsTestOpen(false)
    return
  }

  try {
    const updated = await saveTestResult(result)
    setUser(updated)
  } catch (err) {
    console.error('Не удалось сохранить результат:', err)
  }

  setActiveView('profile')
  setIsTestOpen(false)
}


  const navigate = (to: ActiveView) => {
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
          onFinish={handleTestFinish}
        />
      </Layout>
    )
  }


  if (activeView === 'articles') {
    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        <ArticlesPage
          user={user}
          onOpenArticle={(id) => {
            setCurrentArticleId(id)
            setActiveView('article')
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </Layout>
    )
  }


  if (activeView === 'article') {
    const article = currentArticleId
      ? fullArticles.find(a => a.id === currentArticleId)
      : undefined

    // Если статьи нет — показываем ленту
    if (!article) {
      return (
        <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
          <ArticlesPage
            user={user}
            onOpenArticle={(id) => {
              setCurrentArticleId(id)
              setActiveView('article')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          />
        </Layout>
      )
    }

    const relatedArticles = fullArticles
      .filter(a => a.id !== article.id && a.category === article.category)
      .slice(0, 3)

    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        <ArticlePage
          article={article}
          related={relatedArticles}
          onBack={() => setActiveView('articles')}
          onOpenArticle={(id) => {
            setCurrentArticleId(id)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
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
              logout()                                  // ← добавили
              setUser(null)
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