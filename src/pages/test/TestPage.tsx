import React, { useState } from 'react'
import styles from './TestPage.module.scss'
import { type BodyParams } from '../../widgets/auth/AuthModal'

interface TestPageProps {
  onBack?: () => void
  onBodySubmit?: (params: BodyParams) => void
}

const musicOptions = [
  'Indie / Alternative',
  'Pop & dance',
  'Rock & metal',
  'Hip-hop / R&B',
  'Electronic / techno',
  'Classical & jazz',
]

const TestPage: React.FC<TestPageProps> = ({ onBack, onBodySubmit }) => {
  const [selected, setSelected] = useState<string | null>(null)
  const [body, setBody] = useState({
    heightCm: '',
    shouldersCm: '',
    waistCm: '',
    hipsCm: '',
    shape: '',
  })

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setBody(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveBody = () => {
    if (!onBodySubmit) return

    const toNumber = (val: string) => {
      const n = Number(val.replace(',', '.'))
      return Number.isFinite(n) && n > 0 ? n : undefined
    }

    const payload: BodyParams = {
      heightCm: toNumber(body.heightCm),
      shouldersCm: toNumber(body.shouldersCm),
      waistCm: toNumber(body.waistCm),
      hipsCm: toNumber(body.hipsCm),
      shape: body.shape || undefined,
    }

    onBodySubmit(payload)
  }

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

      <div>
        <p className={styles.stepLabel}>Step 2 · Your body</p>
        <p className={styles.subtitle}>
          These answers help us understand your proportions and suggest styles that match your
          real shape.
        </p>

        <div className={styles.bodyForm}>
          <div className={styles.bodyField}>
            <label className={styles.bodyLabel} htmlFor="heightCm">
              Height (cm)
            </label>
            <input
              id="heightCm"
              name="heightCm"
              className={styles.bodyInput}
              placeholder="e.g. 170"
              value={body.heightCm}
              onChange={handleBodyChange}
            />
          </div>

          <div className={styles.bodyField}>
            <label className={styles.bodyLabel} htmlFor="shouldersCm">
              Shoulders (cm)
            </label>
            <input
              id="shouldersCm"
              name="shouldersCm"
              className={styles.bodyInput}
              placeholder="e.g. 95"
              value={body.shouldersCm}
              onChange={handleBodyChange}
            />
          </div>

          <div className={styles.bodyField}>
            <label className={styles.bodyLabel} htmlFor="waistCm">
              Waist (cm)
            </label>
            <input
              id="waistCm"
              name="waistCm"
              className={styles.bodyInput}
              placeholder="e.g. 70"
              value={body.waistCm}
              onChange={handleBodyChange}
            />
          </div>

          <div className={styles.bodyField}>
            <label className={styles.bodyLabel} htmlFor="hipsCm">
              Hips (cm)
            </label>
            <input
              id="hipsCm"
              name="hipsCm"
              className={styles.bodyInput}
              placeholder="e.g. 96"
              value={body.hipsCm}
              onChange={handleBodyChange}
            />
          </div>

          <div className={styles.bodyField}>
            <label className={styles.bodyLabel} htmlFor="shape">
              Body shape
            </label>
            <select
              id="shape"
              name="shape"
              className={styles.bodySelect}
              value={body.shape}
              onChange={handleBodyChange}
            >
              <option value="">Select shape</option>
              <option value="hourglass">Hourglass</option>
              <option value="rectangle">Rectangle</option>
              <option value="triangle">Triangle</option>
              <option value="inverted triangle">Inverted triangle</option>
              <option value="round">Round</option>
            </select>
          </div>
        </div>

        {onBodySubmit && (
          <div className={styles.saveButtonRow}>
            <button type="button" className={styles.saveButton} onClick={handleSaveBody}>
              Save body parameters
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default TestPage

