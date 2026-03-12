import React from 'react'
import styles from './WardrobePage.module.scss'
import { type AuthUser } from '../../widgets/auth/AuthModal'

interface WardrobePageProps {
  user: AuthUser | null
  onBack: () => void
  onMoreQuestions: () => void
}

const WardrobePage: React.FC<WardrobePageProps> = ({ user, onBack, onMoreQuestions }) => {
  const hasBody = !!user?.body

  return (
    <section className={styles.wardrobePage}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.eyebrow}>YOUR WARDROBE</p>
          <h1 className={styles.title}>Personal style recommendations</h1>
          <p className={styles.subtitle}>
            Based on your body and preferences we highlight shapes, lines and details that are more
            likely to work for you.
          </p>
        </div>

        <button type="button" className={styles.backButton} onClick={onBack}>
          ← Back to profile
        </button>
      </div>

      <div className={styles.columns}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>What to lean into</h2>
          <ul className={styles.list}>
            <li>Clean, vertical lines that gently follow your natural proportions.</li>
            <li>Mid-rise bottoms that define the waist without cutting the body in half.</li>
            <li>Soft, structured fabrics that keep shape but still move with you.</li>
            <li>Necklines that open the collarbone area and visually “lighten” the top.</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>What to be careful with</h2>
          <ul className={styles.list}>
            <li>Very heavy fabrics in places where you don’t want extra volume.</li>
            <li>Strong horizontal cuts exactly at the widest parts of your body.</li>
            <li>Too many small details around the face if you prefer calm, clean look.</li>
          </ul>
        </div>
      </div>

      <div className={styles.moreBlock}>
        <p className={styles.moreText}>
          {hasBody
            ? 'If recommendations do not feel accurate enough, you can refine them by answering a few extra questions about your face shape, hair and lifestyle.'
            : 'To make recommendations truly yours, we need a bit more information about your body, face and hair.'}
        </p>
        <button type="button" className={styles.moreButton} onClick={onMoreQuestions}>
          Answer a few more questions
        </button>
      </div>
    </section>
  )
}

export default WardrobePage

