import React, { useEffect, useRef, useState } from 'react'
import Layout from '../widgets/Layout'
import styles from './App.module.scss'
import TestPage from '../pages/test/TestPage'
import AccountPage from '../pages/account/AccountPage'
import { type AuthUser } from '../widgets/auth/AuthModal'

const App: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [isTestOpen, setIsTestOpen] = useState(false)
  const [activeView, setActiveView] = useState<'home' | 'test' | 'account'>('home')
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

  const navigate = (to: 'home' | 'test' | 'account') => {
    setActiveView(to)
    setIsTestOpen(to === 'test')
  }

  useEffect(() => {
    const nodes = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '-1', 10)
            if (index >= 0) {
              setVisibleCards(prev => new Set([...prev, index]))
            }
          }
        })
      },
      {
        threshold: 0.25,
      }
    )

    nodes.forEach(node => observer.observe(node))

    return () => observer.disconnect()
  }, [])

  const styleCards = [
    {
      id: 1,
      label: 'Minimal',
      title: 'Clean minimal look',
      description: 'Soft colors, simple shapes and maximum clarity in every detail.',
    },
    {
      id: 2,
      label: 'Classic',
      title: 'Timeless classic',
      description: 'Structured silhouettes, balance and calm confident energy.',
    },
    {
      id: 3,
      label: 'Street',
      title: 'Street energy',
      description: 'Relaxed, bold and expressive — perfect for everyday movement.',
    },
    {
      id: 4,
      label: 'Romantic',
      title: 'Soft romantic',
      description: 'Light textures, flowing lines and gentle, soft mood.',
    },
  ]

  if (activeView === 'test' || isTestOpen) {
    return (
      <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
        <TestPage
          onBack={() => {
            setIsTestOpen(false)
            setActiveView('home')
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
          />
        ) : (
          <TestPage
            onBack={() => {
              setActiveView('home')
            }}
          />
        )}
      </Layout>
    )
  }

  return (
    <Layout user={user} onNavigate={navigate} onAuthSuccess={handleAuthSuccess}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>ZM STYLE PLATFORM</p>
          <h1 className={styles.heroTitle}>You choose your style</h1>
          <p className={styles.heroSubtitle}>
            Discover, experiment and create looks that feel truly yours. Simple
            tools, clear steps, and inspiration tailored to you.
          </p>
          <div className={styles.heroActions}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => setIsTestOpen(true)}
            >
              Take the test
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>Learn more</button>
          </div>
        </div>
      </section>

      <section className={styles.stylesSection}>
        <div className={styles.stylesHeader}>
          <p className={styles.stylesEyebrow}>STYLE CARDS</p>
          <h2 className={styles.stylesTitle}>Scroll down and meet different styles</h2>
          <p className={styles.stylesSubtitle}>
            Each card is one direction. When you move down the page, the cards smoothly
            flow from the sides to the center — so you can feel every style separately.
          </p>
        </div>

        <div className={styles.stylesGrid}>
          {styleCards.map((style, index) => (
            <div
              key={style.id}
              data-index={index}
              ref={el => {
                cardsRef.current[index] = el
              }}
              className={`${styles.styleCard} ${
                index % 2 === 0 ? styles.fromLeft : styles.fromRight
              } ${visibleCards.has(index) ? styles.inView : ''}`}
            >
              <div className={styles.styleBadge}>{style.label}</div>
              <h3 className={styles.styleTitle}>{style.title}</h3>
              <p className={styles.styleDescription}>{style.description}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export default App
