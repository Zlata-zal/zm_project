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
import image31 from '../../assets/image/31.jpg'
import image30 from '../../assets/image/30.jpg'



interface HomePageProps {
  onStartTest: () => void
}

const styleCards = [
  {
    id: 1,
    label: 'Minimal',
    title: 'Clean minimal look',
    description: 'Soft colors, simple shapes and maximum clarity in every detail.',
    image: [image15, image31]
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
    image: [image27, image14, image30]
  },
  {
    id: 4,
    label: 'Romantic',
    title: 'Soft romantic',
    description: 'Light textures, flowing lines and gentle, soft mood.',
    image: [image26, image24]
  },
]
const carouselImages = styleCards.flatMap(card => card.image)
console.log(carouselImages)

const PATH = `
M 348 2
C 308 15, 315 17, 235 40
C 155 63, 148 48, 120 69
C 92 90, 159 80, 156 101
C 153 122, 119 106, 111 130
C 103 155, 118 140, 134 171
C 150 203, 165 194, 157 220
C 149 246, 131 222, 112 244
C 93 266, 93 278, 103 283
C 113 288, 114 257, 141 257
C 168 257, 152 279, 181 282
C 210 285, 195 266, 224 266
C 253 266, 233 276, 263 282
C 293 288, 288 262, 309 282
C 330 302, 326 320, 322 340
C 318 360, 292 328, 298 338
C 304 349, 310 353, 338 370
C 366 387, 374 379, 377 387
C 380 395, 343 386, 347 393
C 351 400, 395 387, 388 408
C 381 429, 365 432, 327 453
C 289 474, 292 447, 280 468
C 268 489, 287 483, 293 513
C 299 543, 313 539, 297 554
C 281 569, 277 541, 248 555
C 219 569, 246 582, 214 595
C 182 608, 190 584, 157 591
C 124 598, 148 598, 120 614
C 92 630, 91 618, 76 637
C 61 656, 66 651, 78 667
C 90 683, 89 668, 109 682
C 129 696, 142 694, 134 707
C 126 720, 102 704, 85 720
C 68 736, 72 738, 86 752
C 100 766, 96 750, 125 760
C 154 770, 142 762, 170 780
C 198 798, 204 786, 204 812
C 204 838, 165 834, 170 854
C 175 874, 188 852, 217 869
C 246 886, 227 877, 254 903
C 281 929, 278 910, 293 944
C 308 978, 302 979, 298 1001
C 294 1023, 279 990, 282 1008
C 285 1026, 283 1039, 306 1052
C 329 1065, 328 1038, 348 1045
C 368 1052, 373 1054, 363 1073
C 353 1092, 323 1081, 320 1098
C 317 1116, 353 1100, 354 1123
C 355 1146, 351 1148, 323 1163
C 295 1178, 301 1148, 275 1165
C 249 1183, 277 1201, 248 1213
C 219 1225, 220 1181, 191 1200
C 162 1219, 196 1240, 164 1266
C 132 1292, 136 1261, 100 1275
C 64 1289, 59 1288, 60 1305
C 61 1322, 72 1322, 102 1324
C 132 1326, 112 1311, 147 1311
C 182 1311, 166 1319, 203 1323
C 240 1327, 243 1322, 254 1323
C 265 1324, 242 1326, 235 1327
`;
const center = Math.floor(carouselImages.length / 2)

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
        <svg className={styles.scrollLine} viewBox="-300 0 1400 1800" preserveAspectRatio="none">
          <path className={styles.scrollLineTrack} d={PATH} />
          <path
            className={styles.scrollLineStroke}
            d={PATH}  
            style={{
              strokeDashoffset: `${5150 - scrollProgress * 5150}`,
              }}
          />
        </svg>
      </div>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.mainLogo}>ZM</p>
          <p className={styles.heroEyebrow}>платформа</p>
          <h1 className={styles.heroTitle}>You choose your style</h1>
          <p className={styles.heroSubtitle}>
            Discover, experiment and create looks that feel truly yours. Simple tools, clear
            steps, and inspiration tailored to you.
          </p>
          <div className={styles.heroActions}>
            {/* <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onStartTest}>
              Take the test
            </button> */}
            <button className={`${styles.btn} ${styles.btnSecondary}`}>Learn more</button>
          </div>
        </div>
      </section>

      <section className={styles.stylesSection}>
        <div className={styles.stylesHeader}>
          <p className={styles.stylesEyebrow}></p>
          <h2 className={styles.stylesTitle}>Твой стиль говорит раньше тебя</h2>
          <p className={styles.stylesSubtitle}>
            Each card is one direction. When you move down the page, the cards smoothly flow from
            the sides to the center - so you can feel every style separately.
          </p>
        </div>

        <div className={styles.carousel}>
          {carouselImages
            .map((img, i) => ({ img, i }))
            .filter(({ i }) => Math.max(0, 1 - Math.abs(i - center) * 0.25) > 0)
            .map(({ img, i }) => {
            const distance = i - center
            const abs = Math.abs(distance)
            const gap = 110 
           const offset = distance > 0
            ? distance * 110 + gap
            : distance * 110 - gap
            return (
              <img
                key={i}
                src={img}
                className={styles.itemImageCarousel}
                style={{
                  transform: `
                  translateX(${offset}px)
                  scale(${1 - abs * 0.15})
                `,
                opacity: Math.max(0, 1 - abs * 0.25),
              }}
              />
            )
          })}
           <button
            className={`${styles.btn} ${styles.btnPrimary} ${styles.carouselButton}`}
            onClick={onStartTest}
          >
          Take the test
          </button>
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
