import React, { useState } from 'react'
import styles from './TestPage.module.scss'

interface TestPageProps {
  onBack?: () => void
}

const musicOptions = [
  'Indie / Alternative',
  'Pop & dance',
  'Rock & metal',
  'Hip-hop / R&B',
  'Electronic / techno',
  'Classical & jazz',
]

const TestPage: React.FC<TestPageProps> = ({ onBack }) => {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <section className={styles.testPage}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.stepLabel}>Step 1 · Mood</p>
          <h1 className={styles.title}>What kind of music do you feel most like you?</h1>
          <p className={styles.subtitle}>
            Just tap the option that feels closest to you. There are no wrong answers —
            we only want to feel your vibe.
          </p>
        </div>

        {onBack && (
          <button className={styles.backButton} onClick={onBack}>
            ← Back to styles
          </button>
        )}
      </div>

      <div className={styles.optionsArea}>
        {musicOptions.map((option, index) => (
          <button
            key={option}
            className={`${styles.optionCard} ${styles[`float${(index % 3) + 1}`]} ${
              selected === option ? styles.optionSelected : ''
            }`}
            onClick={() => setSelected(option)}
          >
            <span className={styles.bubbleIndex}>{index + 1}</span>
            <span className={styles.optionText}>{option}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default TestPage

