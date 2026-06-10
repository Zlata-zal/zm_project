import React, { useState } from 'react'
import styles from './Profile.module.scss'
import type { AuthUser } from '../../widgets/auth/AuthModal'



export interface ProfileProps {
  user: AuthUser
  onLogout: () => void
  onOpenWardrobe: () => void
  onRefine: () => void
}

const navItems = [
  { id: 'home',       label: 'главная',     group: 'кабинет', requiresTest: false },
  { id: 'kibbe',      label: 'мой типаж',   group: 'кабинет', requiresTest: true  },
  { id: 'wardrobe',   label: 'гардероб',    group: 'кабинет', requiresTest: true  },
  { id: 'favorites',  label: 'избранное',   group: 'кабинет', requiresTest: false },
  { id: 'article',    label: 'статьи',      group: 'кабинет', requiresTest: false },
  { id: 'messages',   label: 'сообщения',   group: 'аккаунт', requiresTest: false },
  { id: 'settings',   label: 'настройки',   group: 'аккаунт', requiresTest: false },
] as const

const journeySteps = [
  { id: 'register',    label: 'i · регистрация' },
  { id: 'test',        label: 'ii · тест' },
  { id: 'type',        label: 'iii · типаж' },
  { id: 'wardrobe',    label: 'iv · гардероб' },
  { id: 'collections', label: 'v · коллекции' },
  { id: 'mastery',     label: 'vi · мастерство' },
]

const Profile: React.FC<ProfileProps> = ({
  user,
  onLogout,
  onOpenWardrobe,
  onRefine,
}) => {
  const [activeNav, setActiveNav] = useState<string>('home')

 
  const userName = user?.name || user?.email?.split('@')[0] || 'Гость'
  const watermarkLetter = userName.trim().charAt(0).toUpperCase() || '?'

 
  const result = user?.kibbeResult

  const hasResult = !!result

  // Тело
  const kibbeTypeName = result?.bodyTypeName || 'Soft Dramatic'
  const kibbeChapter = result?.bodyChapter || 'vi'
  const kibbeDescription = result?.bodyDescription || 'Описание появится после прохождения теста'
  const kibbeTraits = result?.bodyTraits || ['длинные линии', 'мягкие черты']

  // Статистика — пока заглушки
  const stats = {
    wardrobeCount: 0,
    collectionsCount: 0,
    articlesRead: 0,
    progress: hasResult ? 78 : 5,
    trends: {
      wardrobe: 0,
      collections: 0,
      articles: 0,
      progress: 12,
    },
  }

  // === Прогресс по шагам ===
  const completedSteps = (() => {
    let count = 1
    if (hasResult) count = 3
    if (stats.wardrobeCount > 0) count = 4
    if (stats.collectionsCount > 0) count = 5
    if (stats.progress >= 90) count = 6
    return count
  })()

  const navGroups = (['кабинет', 'аккаунт'] as const).map(group => ({
    group,
    items: navItems.filter(item => item.group === group),
  }))

  const handleNavClick = (id: string, disabled: boolean) => {
    if (disabled) return
    if (id === 'wardrobe') {
      onOpenWardrobe()
      return
    }
    setActiveNav(id)
  }

  const meta = [
    { num: 'i',   value: stats.wardrobeCount,    label: '— гардероб —',   trend: stats.trends.wardrobe },
    { num: 'ii',  value: stats.collectionsCount, label: '— коллекций —',  trend: stats.trends.collections },
    { num: 'iii', value: stats.articlesRead,     label: '— статей —',     trend: stats.trends.articles },
    { num: 'iv',  value: stats.progress,         suffix: '%', label: '— прогресс —', trend: stats.trends.progress },
  ]

  return (
    <div className={styles.profile}>

      {/* === HERO === */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} aria-hidden="true">
          <svg viewBox="0 0 1000 400" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="1000" y2="100" />
            <line x1="0" y1="200" x2="1000" y2="200" />
            <line x1="0" y1="300" x2="1000" y2="300" />
            <line x1="200" y1="0" x2="200" y2="400" />
            <line x1="400" y1="0" x2="400" y2="400" />
            <line x1="600" y1="0" x2="600" y2="400" />
            <line x1="800" y1="0" x2="800" y2="400" />
          </svg>
        </div>
        <span className={styles.heroWatermark}>{watermarkLetter}</span>

        <div className={styles.heroCorners}>
          <span>— style code · est. 2026 —</span>
          {hasResult && (
            <span>chapter <b>{kibbeChapter}</b> / member 014</span>
          )}
        </div>

        <div className={styles.heroContent}>
          <div>
            <p className={styles.heroEyebrow}>
              {hasResult
                ? `— member · ${kibbeTypeName.toLowerCase()} —`
                : '— новичок · добро пожаловать —'}
            </p>
            <h1 className={styles.heroName}>
              {userName.split(' ').map((part, i, arr) => (
                <React.Fragment key={i}>
                  {part}
                  {i < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <div className={styles.heroTypeline}>
              {hasResult ? (
                <>
                  <span className={styles.heroTypeName}>
                    {kibbeTypeName} · {kibbeChapter}
                  </span>
                  <span className={styles.heroDivider}>·</span>
                  <span className={styles.heroTag}>tomsk · 2026</span>
                </>
              ) : (
                <span className={styles.heroTag}>— типаж не определён —</span>
              )}
            </div>
          </div>
          <div className={styles.heroCtaBlock}>
            <span className={styles.heroCtaMeta}>
              {hasResult ? '— расскажи о себе больше —' : '— первый шаг —'}
            </span>
            <button className={styles.heroCta} onClick={onRefine}>
              {hasResult ? 'пройти тест заново →' : 'пройти тест →'}
            </button>
          </div>
        </div>
      </section>

      {/* === TIMELINE === */}
      <section className={styles.timeline}>
        <div className={styles.timelineHeader}>
          <span className={styles.timelineLabel}>— твой путь —</span>
          <span className={styles.timelineProgress}>
            пройдено <b>{completedSteps} / 6</b> этапов
          </span>
        </div>
        <div className={styles.timelineBar}>
          {journeySteps.map((step, i) => {
            const status =
              i + 1 < completedSteps ? 'done'
                : i + 1 === completedSteps ? 'current'
                : 'locked'
            return (
              <React.Fragment key={step.id}>
                <span className={`${styles.step} ${styles[status]}`}>
                  {step.label}
                </span>
                {i < journeySteps.length - 1 && (
                  <span className={styles.stepArrow}>→</span>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </section>

      {/* === META STATS === */}
      <section className={styles.metaRow}>
        {meta.map(cell => (
          <div key={cell.num} className={styles.metaCell}>
            <span className={styles.metaCellNum}>— {cell.num} —</span>
            <span className={styles.metaCellVal}>
              {cell.value}
              {cell.suffix && <em>{cell.suffix}</em>}
            </span>
            <span className={styles.metaCellLabel}>{cell.label}</span>
            {cell.trend !== 0 && (
              <span className={styles.metaCellTrend}>
                {cell.trend > 0 ? '↑' : '↓'} {cell.trend > 0 ? '+' : ''}{cell.trend}
              </span>
            )}
          </div>
        ))}
      </section>

      {/* === BODY === */}
      <div className={styles.body}>

        <nav className={styles.sidebar}>
          {navGroups.map(({ group, items }) => (
            <React.Fragment key={group}>
              <span className={styles.sidebarGroupLabel}>{group}</span>
              {items.map(item => {
                const disabled = item.requiresTest && !hasResult
                return (
                  <div
                    key={item.id}
                    className={`${styles.navItem} ${activeNav === item.id ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
                    onClick={() => handleNavClick(item.id, disabled)}
                  >
                    {item.label}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
          <div className={styles.logoutItem} onClick={onLogout}>
            выйти →
          </div>
        </nav>

        <main className={styles.main}>

          {hasResult ? (
            <>
              {/* === ОСНОВНОЙ РЕЗУЛЬТАТ — ТЕЛО === */}
              <section>
                <div className={styles.dividerSection}>
                  <span className={styles.dividerSectionLabel}>— твой результат —</span>
                </div>
                <article className={styles.kibbeCard}>
                  <div className={styles.kibbePortrait}>
                    {/* портрет — пока пустой контейнер */}
                  </div>
                  <div className={styles.kibbeInfo}>
                    <p className={styles.kibbeInfoEyebrow}>
                      — {kibbeChapter} · {kibbeTypeName.toLowerCase()} —
                    </p>
                    <h3 className={styles.kibbeInfoTitle}>{kibbeTypeName}</h3>
                    <p className={styles.kibbeInfoText}>{kibbeDescription}</p>
                    {kibbeTraits.length > 0 && (
                      <div className={styles.kibbeTraits}>
                        {kibbeTraits.map((trait: string, i: number) => (
                          <span key={i} className={styles.kibbeTrait}>
                            — {trait} —
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </section>

             
              {result && (result.faceTypeName || result.colourSeasonName || result.aestheticName) && (
                <section className={styles.layersSection}>
                  <h3 className={styles.layersTitle}>Дополнительные слои</h3>

                  {result.faceTypeName && (
                    <div className={styles.layerBlock}>
                      <span className={styles.layerLabel}>Лицо:</span>
                      <span className={styles.layerValue}>{result.faceTypeName}</span>
                      {result.faceDescription && (
                        <p className={styles.layerDesc}>{result.faceDescription}</p>
                      )}
                    </div>
                  )}

                  {result.colourSeasonName && (
                    <div className={styles.layerBlock}>
                      <span className={styles.layerLabel}>Цветотип:</span>
                      <span className={styles.layerValue}>{result.colourSeasonName}</span>
                      {result.colourDescription && (
                        <p className={styles.layerDesc}>{result.colourDescription}</p>
                      )}
                      {result.colourPalette && result.colourPalette.length > 0 && (
                        <div className={styles.layerPalette}>
                          {result.colourPalette.map((hex: string, i: number) => (
                            <div
                              key={i}
                              className={styles.layerSwatch}
                              style={{ background: hex }}
                              title={hex}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {result.aestheticName && (
                    <div className={styles.layerBlock}>
                      <span className={styles.layerLabel}>Эстетика:</span>
                      <span className={styles.layerValue}>{result.aestheticName}</span>
                      {result.aestheticDescription && (
                        <p className={styles.layerDesc}>{result.aestheticDescription}</p>
                      )}
                    </div>
                  )}

                  <div className={styles.layerDate}>
                    Тест пройден: {new Date(result.answeredAt).toLocaleDateString('ru-RU')}
                  </div>
                </section>
              )}

              <section>
                <div className={styles.sectionHeader}>
                  <span className={styles.sectionTitle}>— гардероб —</span>
                  <span className={styles.sectionLink} onClick={onOpenWardrobe}>
                    смотреть все →
                  </span>
                </div>
                <div className={styles.wardrobeGrid}>
                  {[
                    { label: 'платье',  color: 'linear-gradient(180deg, #383d41, #2c1810)' },
                    { label: 'блузка',  color: 'linear-gradient(135deg, #c4988a, #963132)' },
                    { label: 'тренч',   color: 'linear-gradient(180deg, #efead4, #d8c4a8)' },
                    { label: 'рубашка', color: 'linear-gradient(135deg, #5c1e1f, #4a1314)' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={styles.wardrobeItem}
                      style={{ background: item.color }}
                    >
                      <span className={styles.wardrobeTag}>— {item.label} —</span>
                    </div>
                  ))}
                  <div
                    className={`${styles.wardrobeItem} ${styles.wardrobeItemAdd}`}
                    onClick={onOpenWardrobe}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    <span className={styles.wardrobeItemAddText}>— добавить —</span>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <EmptyState onStartTest={onRefine} />
          )}

        </main>
      </div>

    </div>
  )
}

const EmptyState: React.FC<{ onStartTest: () => void }> = ({ onStartTest }) => (
  <section>
    <div className={styles.dividerSection}>
      <span className={styles.dividerSectionLabel}>— что разблокируется —</span>
    </div>
    <div className={styles.previewGrid}>
      {[
        { num: '01', title: 'Твой типаж',     desc: 'Один из шести типажей по Кибби с подробным описанием' },
        { num: '02', title: 'Гардероб',       desc: 'Загружай фото вещей и собирай образы по типажу' },
        { num: '03', title: 'Рекомендации',   desc: 'Силуэты, ткани, цвета и аксессуары лично под тебя' },
      ].map(card => (
        <div key={card.num} className={styles.previewCard}>
          <span className={styles.previewCardNum}>— {card.num} —</span>
          <h4 className={styles.previewCardTitle}>{card.title}</h4>
          <p className={styles.previewCardDesc}>{card.desc}</p>
          <div className={styles.previewLock}>
            <svg viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            <span className={styles.previewLockText}>— locked —</span>
          </div>
        </div>
      ))}
    </div>
    <button
      className={styles.heroCta}
      onClick={onStartTest}
      style={{ marginTop: '1.5rem', alignSelf: 'flex-start' }}
    >
      пройти тест →
    </button>
  </section>
)

export default Profile