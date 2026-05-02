import React, { useEffect, useRef, useState } from 'react'
import styles from '../App.module.scss'
import magazin from '../../assets/image/magazin.jpg'
import tt from '../../assets/image/tt.jpg'
import tk from '../../assets/image/tk.jpg'
import sl from '../home/HomePage.module.scss'
import drama from '../../assets/image/drama.jpg'
import natura from '../../assets/image/nature.jpg'
import classic from '../../assets/image/classic.jpg'
import romance from '../../assets/image/romance.jpg'
import gamin from '../../assets/image/gamin.jpg'
import softdrama from '../../assets/image/softdarama.jpg'
import silk from '../../assets/image/silk.jpg'
import linen from '../../assets/image/linen.jpg'
import yy from '../../assets/image/yy.jpg'
import ax from '../../assets/image/ax.jpg'
import glasses from '../../assets/image/glasses.jpg'
import hat from '../../assets/image/hat.jpg'
import back from '../../assets/image/back.jpg'
import textil from '../../assets/image/textil.jpg'


interface HomePageProps {
  onStartTest: () => void
}
type StyleCard =
  | {
      id: number
      variant: 'magazines'
      eyebrow?: string
      title: string
      description: string
      images: string[] // 2 обложки
    }
  | {
      id: number
      variant: 'fabrics'
      eyebrow?: string
      title: string
      description: string
      images: { src: string; label: string }[] // 4 ткани
    }
  | {
      id: number
      variant: 'accessories'
      eyebrow?: string
      title: string
      description: string
      hero: string
      thumbs: { src: string; label: string }[]
    }
  | {
      id: number
      variant: 'silhouettes'
      eyebrow?: string
      title: string
      description: string
      images: { src: string; label: string }[] // 2-3 силуэта
    }

const kibbeTypes = [
  { id: 'dramatic',      caption: 'драматик',      callout: 'драматик',      image: drama },
  { id: 'natural',       caption: 'натурал',       callout: 'натурал',       image: natura },
  { id: 'classic',       caption: 'классик',       callout: 'классик',       image: classic },
  { id: 'romantic',      caption: 'романтик',      callout: 'романтик',      image: romance },
  { id: 'gamine',        caption: 'гамин',         callout: 'гамин',         image: gamin },
  { id: 'softDramatic',  caption: 'софт драматик', callout: 'софт драматик', image: softdrama },
]

const styleCards: StyleCard[] = [
  {
    id: 1,
    variant: 'magazines',
    title: 'Бумажная мода',
    description: 'Раньше, до эпохи Instagram и TikTok, у моды был свой ритуал — глянцевый и шуршащий. Девушки выстраивались в очереди у киосков, ждали свежий номер «Бурды», Vogue или «Космополитен». Журнал был не просто покупкой — это был пропуск в мир последних тенденций..',
    images: [magazin, tt]
  },
  {
  id: 2,
  variant: 'fabrics',
  title: 'Язык материалов',
  description: 'Шёлк, шерсть, лён, бархат — каждая ткань рассказывает свою историю. Лён помнит средневековые ярмарки, шёлк — Великий шёлковый путь, кашемир — индийских ремесленников. Выбирая материал, мы выбираем не просто фактуру, а целую культуру.',
  images: [
      { src: silk,    label: 'шёлк' },
      { src: linen,   label: 'лён' },
      { src: textil,  label: 'бархат' },
      { src: tk,  label: 'да хуй его знает' },
    ],
  },
  {
    id: 3,
    variant: 'accessories',
    title: 'Деталь решает всё',
    description: 'Ремень, серьги, шарф — то, что превращает три случайные вещи в образ. Современная мода устала от «всё новое и сразу»: один акцент важнее десяти трендовых вещей. Аксессуар — это подпись стиля, маленькая, но узнаваемая.',
      hero: ax,
      thumbs: [
        { src: glasses,  label: 'очки' },
        { src: tt, label: 'серьги' },
        { src: ax,    label: 'шарф' },
        { src: yy,    label: 'кольца' },
      ],
  },
  {
    id: 4,
    variant: 'silhouettes',
    title: 'Главное — линия',
    description: 'Силуэт — это первое, что видит глаз. До цвета, до фактуры, до деталей. Прямой или приталенный, узкий или объёмный — он рассказывает о человеке за секунду. В моде нет случайных линий: каждый силуэт работает либо на тебя, либо против тебя.',
    images: [
      { src: hat, label: 'со спины' },
      { src: back, label: 'в профиль' },
    ],
  },
]

const carouselImages: string[] = styleCards.flatMap(card => {
  if (card.variant === 'magazines') return card.images
  if (card.variant === 'fabrics') return card.images.map(img => img.src)
  if (card.variant === 'accessories') return [card.hero, ...card.thumbs.map(t => t.src)]
  if (card.variant === 'silhouettes') return card.images.map(img => img.src)
  return []
})

const PATH = `
M 350 0
C 200 30, 100 80, 150 160
C 200 240, 380 260, 480 320
C 580 380, 700 420, 650 510
C 600 600, 420 580, 280 620
C 140 660, 40 700, 80 800
C 120 900, 280 880, 400 850
C 520 820, 640 800, 700 880
C 760 960, 680 1060, 520 1080
C 360 1100, 180 1080, 60 1140
C -60 1200, -40 1320, 100 1370
C 240 1420, 420 1390, 540 1430
C 660 1470, 780 1500, 760 1600
C 740 1700, 580 1750, 400 1730
C 220 1710, 40 1680, -60 1760
C -160 1840, -100 1960, 80 2010
C 260 2060, 460 2030, 600 2080
C 740 2130, 860 2200, 820 2300
C 780 2400, 600 2440, 420 2410
C 240 2380, 60 2350, -40 2440
C -140 2530, -80 2660, 120 2700
C 320 2740, 540 2700, 700 2750
C 860 2800, 940 2900, 880 3000
C 820 3100, 600 3120, 400 3080
C 200 3040, 0 3000, -100 3090
C -200 3180, -120 3320, 100 3370
C 320 3420, 580 3380, 760 3430
C 940 3480, 980 3600, 880 3700
C 780 3800, 540 3810, 340 3770
C 140 3730, -60 3700, -180 3800
C -300 3900, -200 4060, 80 4110
C 360 4160, 660 4120, 860 4180
C 1060 4240, 1080 4380, 920 4480
C 760 4580, 480 4580, 260 4540
C 40 4500, -180 4480, -260 4580
C -340 4680, -200 4830, 100 4880
C 400 4930, 740 4880, 940 4940
C 1140 5000, 1100 5160, 880 5240
C 660 5320, 360 5300, 100 5260
C -160 5220, -360 5220, -360 5340
C -360 5460, -120 5570, 200 5610
C 520 5650, 880 5620, 1080 5680
C 1280 5740, 1280 5900, 1020 6000
C 760 6100, 380 6080, 80 6040
C -220 6000, -440 6000, -440 6120
C -440 6240, -160 6360, 200 6400
C 560 6440, 920 6420, 1100 6480
C 1280 6540, 1300 6680, 1040 6780
C 780 6880, 360 6860, 60 6820
C -240 6780, -480 6790, -460 6900
`;
const center = Math.floor(carouselImages.length / 2)

const renderCardContent = (card: StyleCard) => {
  switch (card.variant) {
    case 'magazines':
      return (
        <div className={`${styles.cardMedia} ${styles.cardMediaMagazines}`}>
          {card.images.map((img, i) => (
            <div
              key={i}
              className={`${styles.magazineCover} ${i === 0 ? styles.magCoverFirst : styles.magCoverSecond}`}
            >
              <img src={img} alt={`${card.title} ${i}`} />
            </div>
          ))}
          <span className={styles.magazineStamp}>— vintage edition —</span>
        </div>
      )

    case 'fabrics':
      return (
        <div className={`${styles.cardMedia} ${styles.cardMediaFabrics}`}>
          {card.images.map((img, i) => (
            <figure key={i} className={styles.fabricSwatch}>
              <img src={img.src} alt={img.label} />
              <figcaption className={styles.fabricLabel}>— {img.label} —</figcaption>
            </figure>
          ))}
        </div>
      )

    case 'accessories':
      return (
        <div className={`${styles.cardMedia} ${styles.cardMediaAccessories}`}>
          <div className={styles.accessoryHero}>
            <img src={card.hero} alt={card.title} />
            <span className={styles.accessoryHeroTag}>— hero piece —</span>
          </div>
          <div className={styles.accessoryThumbs}>
            {card.thumbs.map((thumb, i) => (
              <figure key={i} className={styles.accessoryThumb}>
                <img src={thumb.src} alt={thumb.label} />
                <figcaption>{thumb.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )

    case 'silhouettes':
      return (
        <div className={`${styles.cardMedia} ${styles.cardMediaSilhouettes}`}>
          {card.images.map((img, i) => (
            <figure key={i} className={styles.silhouetteFrame}>
              <img src={img.src} alt={img.label} />
              <figcaption>— {img.label} —</figcaption>
            </figure>
          ))}
        </div>
      )
  }
}

const HomePage: React.FC<HomePageProps> = ({ onStartTest }) => {
  const cardsRef = useRef<(HTMLElement | null)[]>([])
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
        <aside className={styles.heroSideText}>
            — style code · vol 01 · 2026 —
          </aside>
        <div className={styles.heroContent}>
          <p className={styles.mainLogo}>ZM</p>
          <p className={styles.heroEyebrow}>— выпуск №01 —</p>
          <h1 className={styles.heroTitle}>Твой стиль говорит<br/>раньше тебя</h1>
          <p className={styles.heroSubtitle}>
            Платформа, которая помогает тебе понять, как мода работает именно с твоей внешностью.
            Без шаблонов и универсальных советов — только то, что подходит тебе.
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
          <h2 className={styles.stylesTitle}>Стиль начинается с того, кто ты</h2>
          <p className={styles.stylesSubtitle}>
            Не с трендов. Не с подборок Pinterest. Не с того, что идёт твоей подруге.
            Каждый человек носит свою историю на коже — в линиях лица, в форме плеч,
            в длине шеи. Эти детали складываются в типаж — твой собственный визуальный код.
            Узнай его, и одежда перестанет быть случайной.
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
          {styleCards.map((card, index) => (
            <article
              key={card.id}
              data-index={index}
              ref={el => { 
                cardsRef.current[index] = el 
              }}
              className={`${styles.styleCard} ${styles[`variant-${card.variant}`]} ${
                index % 2 === 0 ? styles.textRight : styles.textLeft
              } ${visibleCards.has(index) ? styles.inView : ''}`}
            >
              {renderCardContent(card)}
              

             <div className={styles.cardText}>
                {card.eyebrow && <span className={styles.cardEyebrow}>{card.eyebrow}</span>}
                <h3 className={styles.styleTitle}>{card.title}</h3>
                <p className={styles.styleDescription}>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
          <section className={sl.kibbeStage}>
            <div className={sl.kibbeRow}>
              {kibbeTypes.map(type => (
                <div key={type.id} className={sl.kibbePerson}>
                  <div className={sl.kibbeCallout}>{type.callout}</div>
                  <div className={sl.kibbePortrait}>
                    <img src={type.image} alt={type.caption} loading="lazy" />
                  </div>
                  <div className={sl.kibbeCaption}>{type.caption}</div>
                </div>
              ))}
            </div>
          </section>
    </div>
  )
}

export default HomePage
