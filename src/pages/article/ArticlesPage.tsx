import React, { useState } from 'react'
import styles from './ArticlesPage.module.scss'
import type { AuthUser } from '../../widgets/auth/AuthModal'
import type { Article, ArticleCategory } from '../article/types'
import { fullArticles } from './ArticleData'

interface ArticlesPageProps {
  user: AuthUser | null
  articles?: Article[]
  onOpenArticle?: (id: string) => void
}

// === КАТЕГОРИИ ===
const categories: { id: ArticleCategory | 'all'; label: string }[] = [
  { id: 'all',     label: 'все' },
  { id: 'types',   label: 'типажи' },
  { id: 'trends',  label: 'тренды' },
  { id: 'brands',  label: 'бренды' },
  { id: 'stories', label: 'истории' },
  { id: 'tips',    label: 'советы' },
]

// === УТИЛИТЫ ===
const groupByDay = (articles: Article[]) => {
  const groups: Record<string, Article[]> = {}
  articles.forEach(article => {
    const day = new Date(article.publishedAt).toISOString().split('T')[0]
    if (!groups[day]) groups[day] = []
    groups[day].push(article)
  })
  return groups
}

const formatDayLabel = (dayStr: string) => {
  const date = new Date(dayStr)
  const today = new Date()
  const yesterday = new Date(Date.now() - 86400000)

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()

  if (isSameDay(date, today)) {
    return `сегодня · ${date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`
  }
  if (isSameDay(date, yesterday)) {
    return `вчера · ${date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`
  }
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}


// === КОМПОНЕНТ ===
const ArticlesPage: React.FC<ArticlesPageProps> = ({
  user,
  articles = fullArticles,
  onOpenArticle,
}) => {
  const [activeFilter, setActiveFilter] = useState<ArticleCategory | 'all' | 'personal'>('all')

  const userKibbeType = user?.kibbeResult?.bodyPrimary
  const userTypeName = user?.kibbeResult?.bodyTypeName

  const filteredArticles = articles.filter(article => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'personal') {
      return !!(userKibbeType && article.forKibbeTypes?.includes(userKibbeType))
    }
    return article.category === activeFilter
  })

  const featured = filteredArticles.find(a => a.isFeatured)
  const restArticles = filteredArticles.filter(a => !a.isFeatured)
  const groupedArticles = groupByDay(restArticles)
  const sortedDays = Object.keys(groupedArticles).sort((a, b) => b.localeCompare(a))

  const personalCount = userKibbeType
    ? articles.filter(a => a.forKibbeTypes?.includes(userKibbeType)).length
    : 0

  const todayString = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.articlesPage}>

      {/* === ШАПКА === */}
      <div className={styles.masthead}>
        <div className={styles.mastheadEdgeL}>— style code · vol 01 —</div>
        <h1 className={styles.mastheadTitle}>The Edit</h1>
        <div className={styles.mastheadEdgeR}>выпуск 14 · 2026</div>
      </div>

      <div className={styles.issueDate}>
        — <b>{todayString}</b> · {articles.length} материалов в выпуске —
      </div>

      {/* === ФИЛЬТРЫ === */}
      <div className={styles.filters}>
        {categories.map(cat => (
          <span
            key={cat.id}
            className={`${styles.filter} ${activeFilter === cat.id ? styles.filterActive : ''}`}
            onClick={() => setActiveFilter(cat.id)}
          >
            {cat.label}
          </span>
        ))}

        {userKibbeType && userTypeName && (
          <span
            className={`${styles.filter} ${styles.filterPersonal} ${activeFilter === 'personal' ? styles.filterPersonalActive : ''}`}
            onClick={() => setActiveFilter('personal')}
          >
            — {userTypeName.toLowerCase()} ({personalCount}) —
          </span>
        )}
      </div>

      {/* === FEATURED === */}
      {featured && (
        <article
          className={styles.lead}
          onClick={() => onOpenArticle?.(featured.id)}
        >
          <div className={styles.leadContent}>
            <div className={styles.leadTagline}>
              <span className={styles.leadBadge}>— главное —</span>
              <span className={styles.leadCat}>{featured.categoryLabel}</span>
              <span className={styles.leadTime}>{featured.readTime} мин</span>
            </div>
            <h2 className={styles.leadTitle}>{featured.title}</h2>
            <p className={styles.leadDeck}>{featured.deck}</p>
            <p className={styles.leadByline}>
              — <b>{featured.author}</b> · опубликовано сегодня
            </p>
          </div>
          <div
            className={styles.leadImage}
            style={featured.imageGradient ? { background: featured.imageGradient } : undefined}
          />
        </article>
      )}

      {/* === ЛЕНТА === */}
      {restArticles.length > 0 && (
        <>
          <h3 className={styles.sectionHeading}>— свежие материалы —</h3>

          {sortedDays.map(day => (
            <React.Fragment key={day}>
              <div className={styles.dateRow}>
                — {formatDayLabel(day)} —
              </div>

              {groupedArticles[day].map(article => {
                const isPersonal = !!(userKibbeType && article.forKibbeTypes?.includes(userKibbeType))
                return (
                  <article
                    key={article.id}
                    className={styles.articleRow}
                    onClick={() => onOpenArticle?.(article.id)}
                  >
                    <div
                      className={styles.articleThumb}
                      style={article.imageGradient ? { background: article.imageGradient } : undefined}
                    />
                    <div className={styles.articleInfo}>
                      <div className={styles.articleMetaRow}>
                        {isPersonal && (
                          <span className={styles.articlePersonal}>— под тебя —</span>
                        )}
                        <span className={styles.articleCat}>— {article.categoryLabel} —</span>
                        <span className={styles.articleTime}>{article.readTime} мин</span>
                      </div>
                      <h4 className={styles.articleTitle}>{article.title}</h4>
                      <p className={styles.articleDeck}>{article.deck}</p>
                    </div>
                    <span className={styles.articleArrow}>→</span>
                  </article>
                )
              })}
            </React.Fragment>
          ))}
        </>
      )}

      {filteredArticles.length === 0 && (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Материалов в этой категории пока нет</p>
          <p className={styles.emptyText}>Загляни позже или выбери другой фильтр</p>
        </div>
      )}
    </div>
  )
}

export default ArticlesPage