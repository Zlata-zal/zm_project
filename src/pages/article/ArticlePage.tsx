import React, { useEffect, useRef, useState } from 'react'
import styles from './Article.module.scss'
import type { FullArticle } from './types'

interface ArticlePageProps {
  article: FullArticle
  related?: FullArticle[]
  onBack: () => void
  onOpenArticle?: (id: string) => void
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  article,
  related = [],
  onBack,
  onOpenArticle,
}) => {
  const [readProgress, setReadProgress] = useState(0)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const el = contentRef.current
      const totalHeight = el.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      const progress = Math.min(100, Math.max(0, (scrolled / totalHeight) * 100))
      setReadProgress(progress)

      const headings = el.querySelectorAll('h2[id]')
      let current: string | null = null
      headings.forEach(h => {
        const rect = h.getBoundingClientRect()
        if (rect.top < 200) current = h.id
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Извлекаем заголовки для оглавления
  const tocItems = article.content
    .filter((b): b is Extract<typeof b, { type: 'heading' }> => b.type === 'heading')
    .map(b => ({ id: b.id, text: b.text }))

  const dateString = new Date(article.publishedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className={styles.articlePage}>
      <div className={styles.progressBar} style={{ width: `${readProgress}%` }} />

      <header className={styles.articleHeader}>
        <button className={styles.backLink} onClick={onBack}>
          ← к ленте
        </button>

        <p className={styles.articleEyebrow}>
          — {article.categoryLabel} · {article.readTime} мин чтения —
        </p>
        <h1 className={styles.articleHeadline}>{article.title}</h1>
        <p className={styles.articleDeck}>{article.deck}</p>

        <div className={styles.articleMeta}>
          <span><b>{article.author}</b></span>
          <span>·</span>
          <span>{dateString}</span>
        </div>

        <div
          className={styles.articleHero}
          style={article.imageGradient ? { background: article.imageGradient } : undefined}
        />
      </header>

      <div className={styles.articleLayout} ref={contentRef}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarSticky}>
            <p className={styles.sidebarLabel}>— оглавление —</p>
            <ul className={styles.toc}>
              {tocItems.map(item => (
                <li
                  key={item.id}
                  className={`${styles.tocItem} ${activeSection === item.id ? styles.tocItemActive : ''}`}
                  onClick={() => {
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                >
                  {item.text}
                </li>
              ))}
            </ul>

            <div className={styles.shareBlock}>
              <p className={styles.sidebarLabel}>— поделиться —</p>
              <div className={styles.shareButtons}>
                <button className={styles.shareBtn}>vk</button>
                <button className={styles.shareBtn}>tg</button>
                <button className={styles.shareBtn}>copy</button>
              </div>
            </div>
          </div>
        </aside>

        <article className={styles.articleContent}>
          {article.content.map((block, i) => {
            if (block.type === 'heading') {
              return (
                <h2 key={i} id={block.id} className={styles.contentH2}>
                  {block.text}
                </h2>
              )
            }
            if (block.type === 'paragraph') {
              return <p key={i} className={styles.contentParagraph}>{block.text}</p>
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={i} className={styles.contentPullquote}>
                  «{block.text}»
                  {block.author && <cite>— {block.author}</cite>}
                </blockquote>
              )
            }
            if (block.type === 'image') {
              return (
                <figure key={i} className={styles.contentImage}>
                  <div
                    className={styles.contentImageBg}
                    style={block.gradient ? { background: block.gradient } : undefined}
                  />
                  {block.caption && <figcaption>{block.caption}</figcaption>}
                </figure>
              )
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className={styles.contentList}>
                  {block.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )
            }
            return null
          })}
        </article>
      </div>

      {related.length > 0 && (
        <section className={styles.relatedSection}>
          <h3 className={styles.relatedHeading}>— читать дальше —</h3>
          <div className={styles.relatedGrid}>
            {related.map(rel => (
              <article
                key={rel.id}
                className={styles.relatedCard}
                onClick={() => onOpenArticle?.(rel.id)}
              >
                <div
                  className={styles.relatedImage}
                  style={rel.imageGradient ? { background: rel.imageGradient } : undefined}
                />
                <div className={styles.relatedInfo}>
                  <span className={styles.relatedCat}>— {rel.categoryLabel} —</span>
                  <h4 className={styles.relatedTitle}>{rel.title}</h4>
                  <p className={styles.relatedDeck}>{rel.deck}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ArticlePage