import React, { useEffect, useRef, useState } from 'react'
import styles from '../App.module.scss'
import image1 from '../../assets/image/1.jpg'
import image2 from '../../assets/image/2.jpg'
import image3 from '../../assets/image/3.jpg'
import image14 from '../../assets/image/14.jpg'
import image27 from '../../assets/image/27.jpg'
import image24 from '../../assets/image/24.jpg'
import image26 from '../../assets/image/26.jpg'
import image15 from '../../assets/image/15.jpg'



interface HomePageProps {
  onStartTest: () => void
}

const styleCards = [
  {
    id: 1,
    label: 'Minimal',
    title: 'Clean minimal look',
    description: 'Soft colors, simple shapes and maximum clarity in every detail.',
    image: [image15]
  },
  {
    id: 2,
    label: 'Classic',
    title: 'Timeless classic',
    description: 'Structured silhouettes, balance and calm confident energy.',
    image: [image1, image2, image3]
  },
  {
    id: 3,
    label: 'Street',
    title: 'Street energy',
    description: 'Relaxed, bold and expressive — perfect for everyday movement.',
    image: [image27, image14]
  },
  {
    id: 4,
    label: 'Romantic',
    title: 'Soft romantic',
    description: 'Light textures, flowing lines and gentle, soft mood.',
    image: [image26, image24]
  },
]
const PATH = `
  M 200 0
  C 250 100,  -120 200,   100 350
  C 230 500,  -300 600,    50 750
  C  190 900,  -550 1000,  -100 1150
  C -150 1300, -700 1400, -350 1550
  C -250 1700, -1000 1800, -750 1900
`;
const HomePage: React.FC<HomePageProps> = ({ onStartTest }) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [scrollProgress, setScrollProgress] = useState(0)

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
      { threshold: 0.25 }
    )

    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) {
        setScrollProgress(0)
        return
      }
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1)
      setScrollProgress(progress)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className={styles.homeRoot}>
      <div className={styles.scrollLineWrap} aria-hidden="true">
        <svg className={styles.scrollLine} viewBox="-800 0 1200 1900" preserveAspectRatio="none">
          <path className={styles.scrollLineTrack} d={PATH} />
          <path
            className={styles.scrollLineStroke}
            d={PATH}  
            style={{
              strokeDashoffset: `${1650 - scrollProgress * 1950}`,
              }}
          />
        </svg>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.mainLogo}>ZM</p>
          <p className={styles.heroEyebrow}>styly platform</p>
          <h1 className={styles.heroTitle}>You choose your style</h1>
          <p className={styles.heroSubtitle}>
            Discover, experiment and create looks that feel truly yours. Simple tools, clear
            steps, and inspiration tailored to you.
          </p>
          <div className={styles.heroActions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onStartTest}>
              Take the test
            </button>
            <button className={`${styles.btn} ${styles.btnSecondary}`}>Learn more</button>
          </div>
        </div>
      </section>

      <section className={styles.stylesSection}>
        <div className={styles.stylesHeader}>
          <p className={styles.stylesEyebrow}></p>
          <h2 className={styles.stylesTitle}>Your style speaks before you do</h2>
          <p className={styles.stylesSubtitle}>
            Each card is one direction. When you move down the page, the cards smoothly flow from
            the sides to the center - so you can feel every style separately.
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
            {Array.isArray(style.image) && 
              style.image.map((img, i) => (
                <img
                key={i}
                src={img}
                alt={`${style.title} ${i}`}
                className={styles.styleImage}
                />
              ))}
              <div className={styles.styleBadge}>{style.label}</div>
              <h3 className={styles.styleTitle}>{style.title}</h3>
              <p className={styles.styleDescription}>{style.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomePage
